import "../../support/hook"

const url = '/v1/articles'

describe(__filename, () => {

  describe('valid params given', () => {
    describe('role guest', () => {
      it("should return article", async () => {
        let article = await factory.create("article")
        let path = `${url}/${article.id}`
        let res = await request(path, {
          unauth: true,
        })

        expect(res.body.data).to.containSubset({ id: article.id })
      })
    })
  })

  describe('wrong params given', () => {
    describe('should return empty array', () => {
      it("should return error", async () => {
        let path = `${url}/test`
        let res = await request(path, {
          unauth: true
        })

        expect(res.body).to.have.property("error")
      })
    })
  })

})
