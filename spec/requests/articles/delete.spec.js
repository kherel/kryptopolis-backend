import "../../support/hook"
import { Article } from "../../../init/mongoose"

describe(__filename, () => {
  const url = '/v1/articles'

  describe('valid params given', () => {
    describe('role guest', () => {
      it("should return article", async () => {
        const user = await factory.create('user', { editor: true })
        let article = await factory.create("article")
        let path = `${url}/${article.id}`

        let res = await request(path, {
          method: "delete",
          user: user,
        })

        expect(res.body.data).to.containSubset({ id: article.id })
        expect(await Article.find()).to.be.empty
      })
    })
  })

  describe('wrong params given', () => {
    describe("user not editor", () => {
      it("should return error", async () => {
        const user = await factory.create('user', { editor: false })
        let article = await factory.create("article")
        let path = `${url}/${article.id}`

        let res = await request(path, {
          method: "delete",
          user: user,
        })

        expect(res.body).to.have.property('error')
      })
    })

    describe('should return empty array', () => {
      it("should return error", async () => {
        let path = `${url}/test`

        let res = await request(path, {
          method: "delete",
        })

        expect(res.body).to.have.property("error")
      })
    })
  })

})
