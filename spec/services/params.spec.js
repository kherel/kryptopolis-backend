import "../support/hook"
import {
  getOptionsFind,
  getInclude,
  getFilterIco,
  getFields
} from "../../app/services/params"

describe(__filename, () => {

  describe('getInclude', () => {
    it("should return valid response", async () => {
      const include = "user,ico,article"
      const req = { query: { include }}
      const res = getInclude(req)
      const response = { user: true, ico: true, article: true }

      expect(res).to.eql(response)
    })
  })

  describe("getFields", async () => {
    it("should return", async () => {
      const result = "title video links"
      const req = { query: { fields: { ico: "title,video,links" } } }
      const res = getFields(req, "ico")

      expect(res).to.eql(result)
    })
  })

  describe("getOptionsFind", async () => {
    it("should return", async () => {
      const req = {
        query: {
          sort: "-test",
          page: {
            offset: 20,
            limit: 10
          }
        }
      }

      const res = getOptionsFind(req)

      const result = {
        skip: 20,
        limit: 10,
        sort: "-test",
      }

      expect(res).to.eql(result)
    })
  })

  describe('getFilterIco', () => {
    describe("filter[data]=now", async () => {
      it("should return", async () => {
        const req = { query: { filter: { data: "now" } } }
        const res = getFilterIco(req)
        const result = {
          "overview.tokenSaleOpeningDate": { "$lt": new Date() },
          "overview.tokenSaleClosingDate": { "$gt": new Date() },
        }

        expect(res).to.eql(result)
      })
    })

    describe("filter[data]=upcoming", async () => {
      it("should return", async () => {
        const req = { query: { filter: { data: "upcoming" } } }
        const res = getFilterIco(req)
        const result = {
          "overview.tokenSaleOpeningDate": { "$gt": new Date() },
          "overview.tokenSaleClosingDate": { "$gt": new Date() },
        }

        expect(res).to.eql(result)
      })
    })

    describe("filter[title]=test", async () => {
      it("should return", async () => {
        const req = { query: { filter: { title: "test" } } }
        const res = getFilterIco(req)

        expect(res).to.eql({ title: /test/i })
      })
    })

    describe("multiple filters", async () => {
      it("should return", async () => {
        const req = { query: { filter: { title: "test", data: "now" } } }
        const res = getFilterIco(req)
        const result = {
          title: /test/i,
          "overview.tokenSaleOpeningDate": { "$lt": new Date() },
          "overview.tokenSaleClosingDate": { "$gt": new Date() },
        }

        expect(res).to.eql(result)
      })
    })
  })

})
