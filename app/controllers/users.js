import { toMongoQuery } from "casl"
import { mergeAll } from "ramda"
import { User } from "../../init/mongoose"
import { userSerializer } from "../serializers"
import { confirm } from "../services/mailgun"
import {
  getFields,
  getAttributes,
  getOptionsFind,
  getFilterUser,
  createFilterAttributes,
  getOptionsSerializer,
} from "../services/params"

const filterAttributes = createFilterAttributes([
  "name",
  "email",
  "role",
  "password",
  "editor",
])

export default {

  index: async (req, res, next) => {
    try {
      const query = mergeAll([
        getFilterUser(req),
        toMongoQuery(req.ability.rulesFor('read', 'users')),
      ])

      const users = await User.find(
        query,
        getFields(req, "user"),
        getOptionsFind(req)
      )

      const total = await User.count(query)
      const response = await userSerializer(users, getOptionsSerializer(req, total))

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  create: async (req, res, next) => {
    try {
      const body = filterAttributes(getAttributes(req))

      const user = await User.createObject(body)

      await confirm(user.email)
      req.log.info(`send confirm email new user ${user.email}`)

      const response = await userSerializer(user)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  show: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      try {
        req.ability.throwUnlessCan('read', user)
      } catch (err) {
        res.status(401)
        return next(err)
      }

      const response = await userSerializer(user, getOptionsSerializer(req))

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params

      try {
        req.ability.throwUnlessCan('access', "updateOtherUsers")
      } catch (err) {
        res.status(401)
        return next(err)
      }

      if (getAttributes(req).editor) {
        try {
          req.ability.throwUnlessCan('access', "editor")
        } catch (err) {
          res.status(401)
          return next(err)
        }
      }

      let user = await User.findById(id)
      const body = filterAttributes(getAttributes(req))

      user.set(body)

      try {
        req.ability.throwUnlessCan('update', user)
      } catch (err) {
        res.status(401)
        return next(err)
      }

      await user.save()

      const response = await userSerializer(user)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params

    try {
      try {
        req.ability.throwUnlessCan('delete', new User({ _id: id }))
      } catch (err) {
        res.status(401)
        return next(err)
      }

      const user = await User.findByIdAndRemove(id)

      if (!user) {
        return next(new Error("user not found"))
      }

      const response = await userSerializer(user)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

}
