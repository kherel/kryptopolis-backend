import mongoose from "mongoose"
import { default as defineAbilitiesFor } from '../policy'

const User = mongoose.model('users')

export default async (req, res, next) => {
  try {
    if (!req.user_id) {
      req.ability = await defineAbilitiesFor()
      return next()
    }

    const user = await User.findById(req.user_id)

    req.user = user
    req.ability = await defineAbilitiesFor(user)

    return next()
  } catch (err) {
    return next(err)
  }
}
