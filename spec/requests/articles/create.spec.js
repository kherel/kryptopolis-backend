import "../../support/hook"

describe(__filename, () => {
  const url = '/v1/articles'

  describe('valid params given', () => {
    it(`should return object`, async () => {
      const user = await factory.create('user', { editor: true })
      const article = await factory.build('article')

      const params = {
        data: {
          attributes: article
        }
      }

      let res = await request(url, {
        params: params,
        user: user,
        method: "post",
      })

      const attr = {
        title: article.title,
        summary: article.summary,
        text: article.text,
        image: article.image,
        user: user.id,
      }

      expect(res.body.data.attributes).to.containSubset(attr)
    })
  })

  describe("wrong params given", () => {
    describe("user not editor", () => {
      it("should return error", async () => {
        const user = await factory.create('user', { editor: false })
        let res = await request(url, {
          method: "post",
          user: user,
        })

        expect(res.body).to.have.property('error')
      })
    })

    describe("user unathorize", () => {
      it("should return error", async () => {
        let res = await request(url, {
          method: "post",
          unauth: true,
        })

        expect(res.body).to.have.property('error')
      })
    })
  })

})
