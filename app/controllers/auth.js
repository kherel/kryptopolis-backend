import request from 'request'
import settings from "../../settings/settings"
import { User } from "../../init/mongoose"
import { createJwt, verifyJwt } from "../services/jwt"
import { tokenSerializer, checkTokenSerializer, messageSerializer } from "../serializers"
import { getAttributes } from "../services/params"
import { confirm, reset } from "../services/mailgun"

export default {

  createToken: async (req, res, next) => {
    try {
      const { email, password } = getAttributes(req)
      const user = await User.findOne({ email: email })

      if (!user) {
        res.status(422)
        next(new Error("user not found"))
      }

      if (!await user.comparePassword(password)) {
        res.status(422)
        next(new Error("wrong password"))
      }

      const response = tokenSerializer(createJwt(user), user.role)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  checkToken: async (req, res, next) => {
    try {
      const role = req.user.role

      const response = checkTokenSerializer(role)

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  sendConfirm: async (req, res, next) => {
    try {
      const email = req.user.email

      await confirm(email)

      const response = messageSerializer("ok")

      return res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  },

  confirm: async (req, res, next) => {
    try {
      const { code } = getAttributes(req)

      if (!code) {
        res.status(422)
        return next(new Error("code should be exist"))
      }

      const user = await User.findOne({ cofirmCode: code })

      if (!user) {
        res.status(422)
        return next( new Error("user not found"))
      }

      await user.set({ cofirmEmail: true })
      await user.save()

      const response = messageSerializer("ok")

      return res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  sendResetPassword: async (req, res, next) => {
    try {
      const { email } = getAttributes(req)

      await reset(email)

      const response = messageSerializer("ok")

      return res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { code, new_password } = getAttributes(req)

      if (!code || !new_password) {
        res.status(422)
        return next(new Error("code and new_password should be exist"))
      }

      const user = await User.findOne({ resetPasswordToken: code })

      if (!user) {
        res.status(422)
        return next(new Error("user with current code not found"))
      }

      await user.update({ password: new_password })

      const response = messageSerializer("ok")

      return res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },

  twitterReverse: async (req, res, next) => {
    try {
      request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
          oauth_callback: `${settings.host}/twitter-callback`,
          consumer_key: settings.twitter.clientID,
          consumer_secret: settings.twitter.clientSecret,
        }
      }, function (err, r, body) {
        if (err) {
          return next(err)
        }

        const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'
        return res.send(JSON.parse(jsonStr))
      })
    } catch (err) {
      return next(err)
    }
  },

  twitterVerifer: async (req, res, next) => {
    try {
      request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
          consumer_key: settings.twitter.clientID,
          consumer_secret: settings.twitter.clientSecret,
          token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
      }, function (err, r, body) {

        if (err) {
          return next(err)
        }

        const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}'

        try {
          const parsedBody = JSON.parse(bodyString)

          req.body['oauth_token'] = parsedBody.oauth_token
          req.body['oauth_token_secret'] = parsedBody.oauth_token_secret
          req.body['user_id'] = parsedBody.user_id

          return next()
        } catch (err) {
          res.status(401)
          return next(new Error(bodyString))
        }
      })
    } catch (err) {
      return next(err)
    }
  },

  passport: (req, res, next) => {
    try {
      const { user } = req

      if (!user) {
        res.status(401)
        return next(new Error('user not authenticated'))
      }

      const response = tokenSerializer(createJwt(user))

      res.status(200).json(response)
    } catch (err) {
      return next(err)
    }
  },
}
