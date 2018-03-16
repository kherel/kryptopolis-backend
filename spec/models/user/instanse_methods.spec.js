import "../../support/hook"
import { User, Ico } from "../../../init/mongoose"

describe(__filename, () => {

  describe('instanse methods', () => {

    describe('#comparePassword', async () => {
      it('valid', async () => {
        let password = "SFXQlXYh5vbISyb"
        let user = await factory.create('user', { password: password })
        let res = await user.comparePassword(password)

        expect(res).to.be.true
      })

      it('wrong', async () => {
        let password = "SFXQlXYh5vbISyb"
        let user = await factory.create('user', { password: password })
        let res = await user.comparePassword("test")

        expect(res).to.be.false
      })
    })

    describe('#generateResetPasswordToken', async () => {
      it('should return field', async () => {
        let user = await factory.create('user')
        let res = await user.generateResetPasswordToken()

        expect(res).to.be.string
      })

      it('should change current field', async () => {
        let user = await factory.create('user')
        let oldResetPasswordToken = user.resetPasswordToken
        await user.generateResetPasswordToken()
        user = await User.findById(user.id)

        expect(user.resetPasswordToken).to.not.eql(oldResetPasswordToken)
      })
    })

    describe('#addFollowers', async () => {
      it('should have user.followers ico.id', async () => {
        let user = await factory.create('user')
        let ico = await factory.create('ico')

        await user.addFollowers(ico)

        expect(user.followers[0]).to.eql(ico._id)
      })

      it('should have ico.followers user.id', async () => {
        let user = await factory.create('user')
        let ico = await factory.create('ico')

        await user.addFollowers(ico)

        expect(ico.followers[0]).to.eql(user._id)
      })

      it('should have models after populate', async () => {
        let user = await factory.create('user')
        let ico = await factory.create('ico')

        await user.addFollowers(ico)

        await User.populate(user, "followers")
        await Ico.populate(ico, "followers")

        expect(ico.followers[0]._id).to.eql(user._id)
        expect(user.followers[0]._id).to.eql(ico._id)
      })
    })

    describe('#removeFollowers', async () => {
      it('should return remove followers user, ico', async () => {
        let user = await factory.create('user')
        let ico = await factory.create('ico')

        await user.addFollowers(ico)
        await user.removeFollowers(ico)

        expect(user.followers).to.be.empty
        expect(ico.followers).to.be.empty
      })
    })

  })

})
