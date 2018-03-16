import "../../support/hook"

describe(__filename, () => {
  let attr

  describe('provider', () => {
    it('should have default provider null', async () => {
      let user = await factory.create('user')

      attr = "google"
      await user.set({ provider: attr })
      await user.save()
      expect(user.provider).to.eql(attr)

      attr = "facebook"
      await user.set({ provider: attr })
      await user.save()
      expect(user.provider).to.eql(attr)

      attr = "twitter"
      await user.set({ provider: attr })
      await user.save()
      expect(user.provider).to.eql(attr)

      attr = null
      await user.set({ provider: attr })
      await user.save()
      expect(user.provider).to.eql(attr)
    })
  })

  describe('cofirmCode', () => {
    it('cofirmCode should not eql', async () => {
      let user1 = await factory.create('user')
      let user2 = await factory.create('user')

      expect(user1.cofirmCode).to.not.eql(user2.cofirmCode)
    })
  })

  describe('cofirmCode', () => {
    it('cofirmCode should not eql', async () => {
      let user1 = await factory.create('user')
      let user2 = await factory.create('user')

      expect(user1.resetPasswordToken).to.not.eql(user2.resetPasswordToken)
    })
  })

})
