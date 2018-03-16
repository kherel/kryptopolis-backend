import "../../support/hook"

const url = '/v1/articles'

describe(__filename, () => {

  describe('valid params given', () => {
    it(`should return object`, async () => {
      const user = await factory.create('user', { editor: true })
      const article = await factory.create('article')
      const newArticle = await factory.build('article')
      const path = `${url}/${article.id}`

      const params = {
        data: {
          attributes: {
            title: newArticle.title
          }
        }
      }

      let res = await request(path, {
        user: user,
        method: "put",
        params,
      })

      const attr = {
        title: newArticle.title,
      }

      expect(res.body.data.attributes).to.containSubset(attr)
    })
  })

  describe("wrong params given", () => {
    describe("user not editor", () => {
      it("should return error", async () => {
        const user = await factory.create('user', { editor: false })
        const article = await factory.create('article')
        const path = `${url}/${article.id}`

        let res = await request(path, {
          method: "put",
          user: user,
        })

        expect(res.body).to.have.property('error')
      })
    })

    describe("user unathorize", () => {
      it("should return error", async () => {
        const path = `${url}/test`
        let res = await request(path, {
          method: "put",
          unauth: true,
        })

        expect(res.body).to.have.property('error')
      })
    })
  })

})
