import { merge, pick } from "ramda"
import { Article } from "../../init/mongoose"
import { articleSerializer } from "../serializers"
import { getAttributes, getOptionsFind } from "../services/params"

const filterAttributes = pick([
  "title",
  "metaTags",
  "keywords",
  "summary",
  "text",
  "image",
  "publish",
  "publishAt",
])

export default {

  index: async (req, res, next) => {
    try {
      let articles = await Article.find({}, null, getOptionsFind(req))
      let total = await Article.count()

      let response = articleSerializer(articles, { total: total })

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  show: async (req, res, next) => {
    const { id } = req.params

    try {
      const article = await Article.findById(id)
      const response = articleSerializer(article)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  create: async (req, res, next) => {
    try {
      req.ability.throwUnlessCan('create', new Article)

      const body = merge(
        filterAttributes(getAttributes(req)),
        { user: req.user_id }
      )

      const article = await Article.createObject(body)
      const response = articleSerializer(article)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('update', new Article)

      let article = await Article.findById(id)

      article.set(filterAttributes(getAttributes(req)))

      await article.save()
      let response = articleSerializer(article)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('delete', new Article)

      const article = await Article.findById(id)

      if (!article) {
        res.status(422)
        return next(new Error("article not found"))
      }

      await article.remove()
      let response = articleSerializer(article)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

}
