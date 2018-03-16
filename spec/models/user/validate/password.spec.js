import "../../../support/hook"
import { User } from "../../../../init/mongoose"

describe(__filename, () => {

  describe('validate password', () => {
    it('present password', async () => {
      let user = await factory.create('user')

      expect(user).to.have.property('_id')
      expect(await User.find({})).to.exist
    })

    it('empty password', async () => {
      try {
        await factory.create('user', { password: null })
      } catch(err) {
        expect(err.message).to.eql('users validation failed: password: Password is required')
      }

      expect(await User.find()).to.be.empty
    })
  })

})
