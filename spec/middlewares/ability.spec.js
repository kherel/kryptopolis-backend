import "../support/hook"
import ability from '../../app/middlewares/ability'

describe(__filename, () => {
  describe('without user', () => {
    it("should defineAbilitiesFor with user", async () => {
      let req = {}
      let res = {}
      let next = () => {}

      await ability(req, res, next)

      expect(req.user).to.be.undefined
      expect(req.ability).to.be.exist
    })
  })

  describe('with user', () => {
    it("should defineAbilitiesFor with user", async () => {
      const user = await factory.create("user")

      let req = { user_id: user.id }
      let res = {}
      let next = () => {}

      await ability(req, res, next)

      expect(req.user).to.have.property('_id').eql(user._id)
      expect(req.ability).to.be.exist
    })
  })

})
