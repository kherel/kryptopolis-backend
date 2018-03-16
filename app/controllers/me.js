import { merge } from "ramda"
import { User } from "../../init/mongoose"
import { userSerializer } from "../serializers"
import { getInclude, getAttributes, createFilterAttributes } from "../services/params"

const filterAttributes = createFilterAttributes([
  "name",
  "email",
  "role",
  "editor",
])

export default {

  show: async (req, res, next) => {
    try {
      const user = await User.findById(req.user_id)
      const response = await userSerializer(user, getInclude(req))

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

  update: async (req, res, next) => {
    try {
      let { user } = req

      if (getAttributes(req).editor) {
        try {
          req.ability.throwUnlessCan('access', "editor")
        } catch (err) {
          res.status(401)
          return next(err)
        }
      }

      let body = filterAttributes(getAttributes(req))

      if (body.email) { body = merge(body, { cofirmEmail: false }) }

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
    try {
      let { password } = getAttributes(req)

      const user = await User.findById(req.user_id)

      if (await user.comparePassword(password)) {
        await user.remove()
      } else {
        res.status(422)
        return next(new Error("password not valid"))
      }

      const response = await userSerializer(user)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

}
