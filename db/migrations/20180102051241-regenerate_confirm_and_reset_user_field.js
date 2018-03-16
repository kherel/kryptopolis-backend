require('babel-register')
const regenerateConfirmAndResetUserField = require('../../app/services/mongo/regenerate_confirm_and_reset_user_field').default

module.exports = {

  async up(db, next) {
    await regenerateConfirmAndResetUserField()
    next()
  },

  down(db, next) {
    next()
  },

}
