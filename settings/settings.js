import dotenv from 'dotenv'

const path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"

dotenv.config({ path: path })

export default {

  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL,
  jwt_secret_key: process.env.JWT_SECRET_KEY,

  isEnvDev: process.env.NODE_ENV == "development",
  isEnvTest: process.env.NODE_ENV == "test",
  isEnvProd: process.env.NODE_ENV == "production",


  salt_password: process.env.SALT_PASSWORD,

  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  },

  twitter: {
    clientID: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  },

  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    listSubscribe: process.env.MAILCHIMP_LIST_SUBSCRIBE,
    listInstance: process.env.MAILCHIMP_LIST_INSTANCE,
  },

  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    from_who: process.env.MAILGUN_FROM_WHO,
  },

  emailUrl: {
    confirm: process.env.EMAIL_URL_CONFIRM,
    reset: process.env.EMAIL_URL_RESET,
  },

  githubToken: process.env.GITHUB_TOKEN,

  cloudinary: {
    name: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET,
  },

  rssFeed: process.env.RSS_FEED,

}
