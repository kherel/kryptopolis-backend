import "../../support/hook"
import { parseUrl } from "../../../app/services/github/helpers"

describe(__filename, () => {

  describe('parseUrl', () => {
    describe('response present', () => {
      it("should return repo", async () => {
        const url = "https://github.com/maids/afetest"
        let res = parseUrl(url)

        expect(res).to.be.exist
      })
      it("should return repo", async () => {
        const url = "https://github.com/Bit-Nation/BITNATION-Pangea-react"
        let res = parseUrl(url)

        expect(res).to.be.exist
      })
    })

    describe('response null', () => {
      it("should return null", async () => {
        const url = "https://github.com/WishFinanceCom/"
        let res = parseUrl(url)

        expect(res).to.be.null
      })
      it("should return null", async () => {
        const url = "https://github.com/WishFinanceCom"
        let res = parseUrl(url)

        expect(res).to.be.null
      })
    })
  })

})
