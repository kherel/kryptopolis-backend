import "../../../support/hook"

const url = '/v1/me'

describe(__filename, () => {
  let user, ico1, ico2, res
  const path = `${url}?include=followers,icoes`

  describe('valid params given', () => {
    beforeEach(async () => {
      user = await factory.create("user")

      ico1 = await factory.create("ico")
      user = await user.addFollowers(ico1)

      ico2 = await factory.create("ico")
      user = await user.addIco(ico2)

      res = await request(path, { user: user })
    })

    it("should return include followers", async () => {
      expect(res.body.included).to.containSubset([{
        type: "followers",
        id: ico1.id,
      }])
    })

    it("should return include icoes", async () => {
      expect(res.body.included).to.containSubset([{
        type: "icoes",
        id: ico2.id,
      }])
    })

  })
})
