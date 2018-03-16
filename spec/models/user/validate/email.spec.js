import "../../../support/hook"
import { User } from "../../../../init/mongoose"

describe(__filename, () => {

  describe('validate email', () => {
    let password = "password"

    it('valid email', async () => {
      let email = "test@test.com"
      let user = await factory.create('user', { email: email, password: password })

      expect(user).to.have.property('_id')
      expect(await User.find({})).to.exist
    })

    it('wrong email', async () => {
      let email = "test"

      try {
        await factory.create('user', { email: email, password: password })
      } catch(err) {
        expect(err.message).to.eql('users validation failed: email: Please fill a valid email address')
      }

      expect(await User.find({})).to.be.empty
    })

    it('empty email', async () => {
      try {
        await User.create({ password: password })
      } catch(err) {
        expect(err.message).to.eql('users validation failed: email: Email address is required')
      }
      expect(await User.find({})).to.be.empty
    })
  })

})
