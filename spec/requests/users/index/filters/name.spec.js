import "../../../../support/hook"

const url = "/v1/users"

describe(__filename, () => {
  describe('filter[name]=query', () => {
    const name = "verylongstrings"

    describe('query exist', () => {
      it("should return ico", async () => {
        const term = "long"
        const admin = await factory.create("superAdmin")
        const user = await factory.create("user", { name })

        const path = `${url}?filter[name]=${term}`

        let res = await request(path, {
          user: admin
        })

        expect(res.body.data).to.containSubset([{ id: user.id }])
      })
    })

    describe('query not found', () => {
      it("should not return ico", async () => {
        const admin = await factory.create("superAdmin")
        const term = "lang"

        await factory.create("user", { name })

        const path = `${url}?filter[name]=${term}`

        let res = await request(path, { user: admin })

        expect(res.body.data).to.be.empty
      })
    })

  })
})
