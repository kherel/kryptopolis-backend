import "../../../support/hook"

const url = '/v1/me'

describe(__filename, () => {
  let user, res

  describe('valid params given', () => {

    beforeEach(async () => {
      user = await factory.create("user")
      res = await request(url, { user: user })
    })

    it("should return valid response", async () => {
      const response = {
        name: user.name,
        email: user.email,
        role: user.role,
        cofirmEmail: false,
      }

      expect(res.body.data.attributes).to.containSubset(response)
    })

    it("should return valid status", async () => {
      expect(res.status).to.eql(200)
    })

    it("should return valid user id", async () => {
      expect(res.body.data.id).to.eql(user.id)
    })
  })

})
