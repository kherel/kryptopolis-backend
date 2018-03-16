import { User, Ico } from "../../../init/mongoose"
import { getId, getInclude } from "../../services/params"
import { userSerializer } from "../../serializers"

export default {

  create: async (req, res, next) => {
    try {
      let user = await User.findById(req.user_id)
      let ico = await Ico.findById(getId(req))

      if (!ico) {
        res.status(422)
        next(new Error("ico not found"))
      }

      await user.addFollowers(ico)

      const response = await userSerializer(user, getInclude(req))

      res.status(200).json(response)
    } catch(err) {
      if (err.name == "CastError") res.status(422)
      return next(err)
    }
  },

  delete: async (req, res, next) => {
    try {
      let user = await User.findById(req.user_id)
      let ico = await Ico.findById(getId(req))

      if (!ico) {
        res.status(422)
        next(new Error("ico not found"))
      }

      await user.removeFollowers(ico)

      const response = await userSerializer(user, getInclude(req))

      res.status(200).json(response)
    } catch(err) {
      if (err.name == "CastError") res.status(422)
      return next(err)
    }
  },

}
