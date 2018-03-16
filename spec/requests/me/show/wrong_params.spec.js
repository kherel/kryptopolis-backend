import "../../../support/hook"

const url = '/v1/me'

describe(__filename, () => {

  describe('wrong params given', () => {
    describe('user unathorize', () => {
      it("should return error", async () => {
        let res = await request(url, {
          unauth: true
        })

        expect(res.status).to.eql(401)
        expect(res.body).to.property("error")
      })
    })
  })

})
