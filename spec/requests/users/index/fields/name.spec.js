import "../../../../support/hook"

const url = '/v1/users'

describe(__filename, () => {
  const path = `${url}?fields[user]=name`

  describe('fields[user]=members', () => {
    it("should return user with only name", async () => {
      const user = await factory.create("superAdmin")

      let res = await request(path, { user })

      expect(res.status).to.eql(200)
      expect(res.body.data[0].attributes).to.have.property("name")
      expect(res.body.data).to.containSubset([{ id: user.id }])
    })

  })
})
