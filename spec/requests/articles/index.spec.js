import "../../support/hook"
import { Article } from "../../../init/mongoose"

describe(__filename, () => {
  const url = '/v1/articles'

  describe('valid params given', () => {
    describe('pagination', () => {
      it("should return with page[offset]", async () => {
        await factory.create("article")
        await factory.create("article")
        await factory.create("article")
        const path = `${url}?page[offset]=1&page[limit]=1`

        let res = await request(path, {
          unauth: true
        })

        expect(res.body.data.length).to.eql(1)
      })
      it("should return with total pages", async () => {
        await factory.create("article")
        await factory.create("article")

        let res = await request(url, {
          unauth: true
        })

        expect(res.body.meta["total-pages"]).to.eql(await Article.count())
      })
    })

    describe('role guest', () => {
      it("should return article", async () => {
        let article = await factory.create("article")
        let res = await request(url, {
          unauth: true
        })

        expect(res.body.data).to.containSubset([{ id: article.id }])
      })
    })
  })

  describe('empty params given', () => {
    describe('should return empty array', () => {
      it("should return empty", async () => {
        let res = await request(url, {
          unauth: true
        })

        expect(res.body.data).to.be.empty
      })
    })
  })

})
