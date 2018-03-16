import moment from 'moment'
import "../../support/hook"

describe(__filename, () => {

  it('attributes', async () => {
    let ico = await factory.build("ico")

    const attributes = [
      "_id",
      "projectName",
    ]

    attributes.map((attrubute) => {
      expect(ico).to.have.property(attrubute).eql(ico[attrubute])
    })
  })

  describe('status', async () => {
    it("should return ICO running", async () => {
      const overview = {
        tokenSaleOpeningDate: moment().add(-1, 'days'),
        tokenSaleClosingDate: moment().add(1, 'days'),
      }

      const ico = await factory.build("ico", { overview })
      expect(ico.status).to.eql("ICO running")
    })

    it("should return ICO over", async () => {
      const overview = {
        tokenSaleOpeningDate: moment().add(-2, 'days'),
        tokenSaleClosingDate: moment().add(-1, 'days'),
      }

      const ico = await factory.build("ico", { overview })
      expect(ico.status).to.eql("ICO over")
    })

    it("should return ICO coming", async () => {
      const overview = {
        tokenSaleOpeningDate: moment().add(2, 'days'),
        tokenSaleClosingDate: moment().add(5, 'days'),
      }

      const ico = await factory.build("ico", { overview })
      expect(ico.status).to.eql("ICO coming")
    })

    it("should return null", async () => {
      let overview, ico

      overview = {
        tokenSaleOpeningDate: null,
        tokenSaleClosingDate: moment().add(1, 'days'),
      }

      ico = await factory.build("ico", { overview })
      expect(ico.status).to.eql(null)

      overview = {
        tokenSaleOpeningDate: moment().add(1, 'days'),
        tokenSaleClosingDate: null,
      }

      ico = await factory.build("ico", { overview })
      expect(ico.status).to.eql(null)

      overview = {
        tokenSaleOpeningDate: null,
        tokenSaleClosingDate: null,
      }

      ico = await factory.build("ico", { overview })
      expect(ico.status).to.eql(null)
    })

    it("should return trading", async () => {
      let overview, ico

      overview = {
        tokenSaleOpeningDate: null,
        tokenSaleClosingDate: moment().add(1, 'days'),
        status: "Trading",
      }

      ico = await factory.build("ico", { overview })

      expect(ico.status).to.eql("Trading")
    })

    it("should return trading", async () => {
      let overview, ico

      overview = {
        tokenSaleOpeningDate: moment().add(-2, 'days'),
        tokenSaleClosingDate: moment().add(-1, 'days'),
        status: "Trading",
      }

      ico = await factory.build("ico", { overview })

      expect(ico.status).to.eql("Trading")
    })
  })

  it('titleUrl', async () => {
    const title = "#$AAAA and ?dsfdsf"
    const result = "aaaa_and_dsfdsf"

    const ico = await factory.create("ico", { title })

    expect(ico.titleUrl).to.eql(result)
  })

})
