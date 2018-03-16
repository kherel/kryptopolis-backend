import "../../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {
  describe('valid params given', () => {

    describe('include=followers', () => {
      const path = `${url}?include=user`

      it("should return include", async () => {
        const user = await factory.create("user")
        const ico = await factory.create("ico")
        await user.addIco(ico)

        let res = await request(path, { user })

        expect(res.body.included).to.containSubset([{
          id: user.id,
          type: "user",
        }])
      })
    })
  })

})
