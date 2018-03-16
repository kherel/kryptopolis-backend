import mongoose from 'mongoose'
import passport from 'passport'
import settings from '../../settings/settings'
import google from './passport/google'
import facebook from './passport/facebook'
import twitter from './passport/twitter'

const buildPassport = () => {
  if (settings.isEnvTest) {
    return {
      authenticate: () => {
        return (req, res, next) => {
          req.user = { _id: "id" }
          return next()
        }
      },
      initialize: () => {
        return (req, res, next) => {
          req.user = { _id: "id" }
          return next()
        }
      }
    }
  }

  const User = mongoose.model('users')

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  passport.use(google)
  passport.use(facebook)
  passport.use(twitter)

  return passport
}

export default buildPassport()
