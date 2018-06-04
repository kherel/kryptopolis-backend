import { merge, pick } from "ramda"
import { Video } from "../../init/mongoose"
import { videoSerializer } from "../serializers"
import { getAttributes, getOptionsFind } from "../services/params"

const filterAttributes = pick([
  "title",
  "text",
  "video",
  "publish",
  "publishAt",
])

export default {

  index: async (req, res, next) => {
    try {
      let options = {};
      
      if (!req.user || req.user.role == "user")
        options = { publish: true, $or: [ { publishAt: { $exists: false } }, { publishAt: { $exists: true, $lte: new Date() } } ] }

      let videos = await Video.find(options, null, getOptionsFind(req)).
        populate("user", "name")
      let total = await Video.count()

      let response = videoSerializer(videos, { total: total })

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  show: async (req, res, next) => {
    const { id } = req.params

    try {
      const video = await Video.findById(id).
        populate("user", "name")

      if ((!req.user || req.user.role == "user")
        && news && (news.publish === false || news.publishAt > new Date())) {
        res.status(401)
        return next(new Error("forbidden"))
      }

      const response = videoSerializer(video)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  create: async (req, res, next) => {
    try {
      req.ability.throwUnlessCan('create', new Video)

      const body = merge(
        filterAttributes(getAttributes(req)),
        { user: req.user_id }
      )

      const video = await Video.createObject(body)
      const response = videoSerializer(video)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('update', new Video)

      let video = await Video.findById(id)

      video.set(filterAttributes(getAttributes(req)))

      await video.save()
      let response = videoSerializer(video)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params

    try {
      req.ability.throwUnlessCan('delete', new Video)

      const video = await Video.findById(id)

      if (!video) {
        res.status(422)
        return next(new Error("video not found"))
      }

      await video.remove()
      let response = videoSerializer(video)

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

}
