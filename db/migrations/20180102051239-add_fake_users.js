require('babel-register')
const addFakeUsers = require('../../app/services/mongo/add_fake_users').default

module.exports = {

  async up(db, next) {
    await addFakeUsers()
    next()
  },

  down(db, next) {
    next()
  },

}
