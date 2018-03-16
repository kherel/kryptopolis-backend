import { User } from "../../init/mongoose"
import settings from '../../settings/settings'
import { verifyJwt } from '../services/jwt'

export default async (req, res, next) => {
  if (!req.header('Authorization') || !req.header('authorization')) {
    res.status(401)
    return next(new Error("header Authorization Bearer TOKEN_HERE not found"))
  }

  const parts = req.header('Authorization').split(' ');
  const token = parts[1]

  if (!token) {
    res.status(401)
    return next(new Error("invalid token"))
  }

  try {
    const payload = verifyJwt(token)
    req.payload = payload
    req.user_id = payload.user_id
    req.user = await User.findById(payload.user_id)

    if (!req.user) {
      res.status(401)
      return next(new Error("user not found"))
    }

    if (req.log && !settings.isEnvTest) {
      req.log.info(`login as ${payload.user_id}, ${payload.email}`)
    }

    next()
  } catch (err){
    return next(err)
  }

}
