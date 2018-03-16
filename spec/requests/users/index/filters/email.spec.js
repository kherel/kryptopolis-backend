import "../../../../support/hook"

const url = "/v1/users"

describe(__filename, () => {
  describe('filter[email]=query', () => {
    const email = "test@test.com"

    describe('query exist', () => {
      it("should return ico", async () => {
        const term = "test@"
        const admin = await factory.create("superAdmin")
        const user = await factory.create("user", { email })

        const path = `${url}?filter[email]=${term}`

        let res = await request(path, {
          user: admin
        })

        expect(res.body.data).to.containSubset([{ id: user.id }])
      })
    })

    describe('query not found', () => {
      it("should not return ico", async () => {
        const admin = await factory.create("superAdmin")
        const term = "tasst"

        await factory.create("user", { email })

        const path = `${url}?filter[email]=${term}`

        let res = await request(path, { user: admin })

        expect(res.body.data).to.be.empty
      })
    })

  })
})
