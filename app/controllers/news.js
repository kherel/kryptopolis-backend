import { merge, pick } from "ramda"
import { News } from "../../init/mongoose"
import { newsSerializer } from "../serializers"
import { getAttributes, getOptionsFind } from "../services/params"

const filterAttributes = pick([
  "title",
  "text",
  "draft",
  "summary",
  "image",
  "publish",
  "publishAt",
])

export default {

  index: async (req, res, next) => {
    try {
      let options = {};
      
      if (!req.user || req.user.role == "user")
        options = { publish: true, publishAt: { $exists: true, $lte: new Date() } }

      let requestOptions = getOptionsFind(req)

      let news = await News.find(options, null, requestOptions).
        populate("user", "name")
      let total = await News.count(options)

      let response = newsSerializer(news, { total: total })

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  show: async (req, res, next) => {
    const { id } = req.params

    try {
      const news = await News.findById(id).
        populate("user", "name")

      if ((!req.user || req.user.role == "user") 
        && news && (news.publish === false || news.publishAt > new Date())) {
          res.status(401)
          return next(new Error("forbidden"))
      }

      const response = newsSerializer(news)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  create: async (req, res, next) => {
    try {
      req.ability.throwUnlessCan('create', new News)

      const body = merge(
        filterAttributes(getAttributes(req)),
        { user: req.user_id }
      )

      const news = await News.createObject(body)
      const response = newsSerializer(news)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('update', new News)

      let news = await News.findById(id)

      news.set(filterAttributes(getAttributes(req)))

      await news.save()
      let response = newsSerializer(news)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('delete', new News)

      const news = await News.findById(id)

      if (!news) {
        res.status(422)
        return next(new Error("news not found"))
      }

      await news.remove()
      let response = newsSerializer(news)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

}
