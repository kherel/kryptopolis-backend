import "../../../../support/hook"

const url = '/v1/users'

describe(__filename, () => {
  describe('valid params given', () => {

    describe('include=icoes', () => {
      const path = `${url}?include=icoes`

      it("should return include", async () => {
        const user = await factory.create("user")
        const ico = await factory.create("ico")
        await user.addIco(ico)

        let res = await request(path, { user: user })

        expect(res.body.included).to.containSubset([{
          id: ico.id,
          type: "icoes",
        }])
      })
    })
  })

})
