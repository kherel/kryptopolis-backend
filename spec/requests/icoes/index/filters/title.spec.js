import "../../../../support/hook"

const url = "/v1/icoes"

describe(__filename, () => {
  describe('filter[title]=query', () => {
    describe('query found', () => {
      it("should return ico", async () => {
        const title = "verylongstrings"
        const term = "long"
        const ico = await factory.create("icoVisible", { title })
        const path = `${url}?filter[title]=${term}`

        let res = await request(path, { unauth: true })

        expect(res.body.data[0].id).to.eql(ico.id)
      })
    })

    describe('query not found', () => {
      it("should not return ico", async () => {
        const title = "verylongstrings"
        const term = "lang"
        const path = `${url}?filter[title]=${term}`

        await factory.create("icoVisible", { title })

        let res = await request(path, { unauth: true })

        expect(res.body.data).to.be.empty
      })
    })

  })
})
