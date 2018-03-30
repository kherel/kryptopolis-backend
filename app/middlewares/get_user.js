import settings from '../../settings/settings'
import { User } from "../../init/mongoose"
import { verifyJwt } from '../services/jwt'

export default async (req, res, next) => {

  if (!req.header('Authorization') || !req.header('authorization')) {
    return next()
  }

  const parts = req.header('Authorization').split(' ');
  const token = parts[1]

  if (!token) {
    return next()
  }

  try {
    const payload = verifyJwt(token)

    req.payload = payload
    req.user_id = payload.user_id

    if (payload.user_id) {
      req.user = await User.findById(payload.user_id)
      if (!req.user) {
        res.status(401)
        next(new Error("user not found"))
      }
    }

    if (req.log && !settings.isEnvTest) {
      req.log.info(`login as ${payload.user_id}, ${payload.email}`)
    }

    next()
  } catch (err){
    return next(err)
  }

}
