import "../../../../support/hook"

const url = "/v1/icoes"

describe(__filename, () => {
  describe('filter[approve]=true', () => {
    describe('query found', () => {
      it("should return ico", async () => {
        const user = await factory.create("user", { role: "superAdmin" })

        const ico1 = await factory.create("ico", { approve: true })
        const ico2 = await factory.create("ico", { approve: false })

        const path = `${url}?filter[approve]=true`

        let res = await request(path, { user })

        expect(res.body.data).to.containSubset([{ id: ico1.id }])
        expect(res.body.data).to.not.containSubset([{ id: ico2.id }])
      })
    })
  })
})
