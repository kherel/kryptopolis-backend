require('babel-register')
const addFollowersCount = require('../../app/services/mongo/add_followers_count').default

module.exports = {

  async up(db, next) {
    await addFollowersCount()
    next()
  },

  down(db, next) {
    next()
  },

}
