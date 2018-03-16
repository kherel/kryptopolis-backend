import mongoose from 'mongoose'
import TwitterTokenStrategy from 'passport-twitter-token'
import settings from '../../../settings/settings'

const User = mongoose.model('users')

export const findOrCreateUser = async (accessToken, refreshToken, profile, done) =>  {
  let user

  try {
    if (!profile.id) {
      return done(new Error("profile.id not found"), null)
    }

    user = await User.findOne({ 'twitter.id_str': profile.id })

    if (user) {
      return done(null, user)
    }

    const email = profile.emails && profile.emails[0].value

    if (!email) {
      return done(new Error("email not found"), null)
    }

    if (await User.findOne({ 'email': email })) {
      return done(new Error("email already exist"), null)
    }

    user = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: Math.random().toString(36).slice(-8),
      provider: 'twitter',
      twitter: profile._json,
    })

    await user.save()

    return done(null, user)
  } catch (err) {
    return done(err, null)
  }
}

export default new TwitterTokenStrategy(
  {
    consumerKey: settings.twitter.clientID,
    consumerSecret: settings.twitter.clientSecret,
    includeEmail: true,
  },
  findOrCreateUser
)
