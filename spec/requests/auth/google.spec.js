import "../../support/hook"

const url = "/v1/auth/google"

describe(__filename, () => {

  describe(`POST ${url}`, () => {
    it("should call passport", async () => {
      let res = await request(url, {
        method: "post",
        unauth: true,
      })

      expect(res.status).to.eql(200)
      expect(res.body.data.attributes).to.have.property('value')
    })
  })
})
