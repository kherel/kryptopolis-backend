import { User } from "../../../init/mongoose"
import { getInclude, getAttributes } from "../../services/params"
import { userSerializer } from "../../serializers"

export default {

  update: async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = getAttributes(req)
      const user = await User.findById(req.user_id)

      if (await user.comparePassword(oldPassword)) {
        await user.set({ password: newPassword })
        await user.save()
      } else {
        res.status(422)
        return next(new Error("password not valid"))
      }

      const response = await userSerializer(user, getInclude(req))

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

}
