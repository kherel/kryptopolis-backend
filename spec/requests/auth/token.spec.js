import "../../support/hook"

const url = "/v1/auth/token"

describe(__filename, () => {

  describe(`PUT ${url}`, async () => {

    it(`valid params given`, async () => {
      let password = "SFXQlXYh5vbISyb"
      let user = await factory.create('user', { password: password })

      const params = {
        data: {
          attributes: {
            email: user.email,
            password: password,
          }
        }
      }

      let res = await request(url, {
        method: "put",
        unauth: true,
        params,
      })

      expect(res.body.data.attributes).to.have.property('value')
    })

    it(`wrong params given`, async () => {
      let password = "SFXQlXYh5vbISyb"
      let user = await factory.create('user', { password: password })

      const params = {
        data: {
          attributes: {
            email: user.email,
            password: "test",
          }
        }
      }

      let res = await request(url, {
        method: "put",
        unauth: true,
        params,
      })

      expect(res.body).to.have.property('error').eql('wrong password')
    })

    it(`empty user`, async () => {
      const email = "test@test.com"
      const params = {
        data: {
          attributes: {
            email,
            password: "test",
          }
        }
      }

      let res = await request(url, {
        method: "put",
        unauth: true,
        params,
      })

      expect(res.body).to.have.property('error').eql("user not found")
    })

  })

})
