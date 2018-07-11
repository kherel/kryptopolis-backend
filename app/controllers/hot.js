import { merge, pick } from "ramda"
import { Hot } from "../../init/mongoose"
import { hotSerializer } from "../serializers"
import { getAttributes, getOptionsFind } from "../services/params"

const filterAttributes = pick([
  "news",
  "article",
  "video",
])

export default {

  show: async (req, res, next) => {

    try {
      let hot = await Hot.findOne().sort('-createdAt')
        .populate("news")
        .populate("article")
        .populate("video")

      if (!hot) {
        hot = await Hot.createObject()
      }

      if ((!req.user || req.user.role == "user") 
        && hot && (
          (hot.article && (hot.article.publish === false || hot.article.publishAt > new Date())) ||
          (hot.video && (hot.video.publish === false || hot.video.publishAt > new Date())) ||
          (hot.news && (hot.news.publish === false || hot.news.publishAt > new Date()))
          )
        ) {
          res.status(401)
          return next(new Error("forbidden"))
      }

      const response = hotSerializer(hot)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  update: async (req, res, next) => {
    try {
      req.ability.throwUnlessCan('update', new Hot)

      let hot = await Hot.findOne().sort('-createdAt')

      if (!hot) {
        hot = await Hot.createObject()
      }

      const attributes = filterAttributes(getAttributes(req))

      if (attributes.length > 1) {
        res.status(409)
        return next(new Error("Too many arguments"))
      }

      delete hot.news
      delete hot.video
      delete hot.article

      hot.set(attributes)

      await hot.save()

      let response = hotSerializer(hot)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('delete', new News)

      let hot = await Hot.findOne().sort('-createdAt')

      if (!hot) {
        hot = await Hot.createObject()
      } else {
        delete hot.news
        delete hot.video
        delete hot.article
      }

      await hot.save()

      let response = hotSerializer(hot)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

}
