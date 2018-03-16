import "../../support/hook"

describe(__filename, () => {

  describe('hooks', () => {
    describe('before save', async () => {
      it('should bcrypt password', async () => {
        let password = "SFXQlXYh5vbISyb"
        let user = await factory.create('user', { password: password })

        expect(user.password).to.not.eql(password)
      })
    })
  })

})
