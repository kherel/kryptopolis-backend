import "../../../support/hook"

const url = '/v1/users'

describe(__filename, () => {

  describe('valid params given', () => {
    describe('pagination', () => {
      it("should return with total pages", async () => {
        const user = await factory.create("user")

        let res = await request(url, {
          user: user
        })

        expect(res.body.meta["total-pages"]).to.eql(1)
      })
    })
  })

})
