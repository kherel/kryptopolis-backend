import "../../../../support/hook"

const url = '/v1/icoes?filter[data]=now'

describe(__filename, () => {
  const time = new Date("12 Nov 2018 01:00:00")

  beforeEach(( ) => {
    timekeeper.freeze(time)
  })

  afterEach(( ) => {
    timekeeper.reset()
  })

  describe('filter[date]=now', () => {
    describe('now date', () => {
      const options = {
        overview: {
          tokenSaleOpeningDate: new Date("10. Nov 2018"),
          tokenSaleClosingDate: new Date("20. Nov 2018"),
        }
      }

      it("should return ico", async () => {
        const ico = await factory.create("icoVisible", options)

        let res = await request(url, {
          unauth: true
        })

        expect(res.body.data[0].id).to.eql(ico.id)
      })
    })

    describe('now date with invisibleAdmin', () => {
      const options = {
        overview: {
          tokenSaleOpeningDate: new Date("10. Nov 2018"),
          tokenSaleClosingDate: new Date("20. Nov 2018"),
        },
        visibleAdmin: false,
      }

      it("should return ico", async () => {
        await factory.create("ico", options)

        let res = await request(url, {
          unauth: true
        })

        expect(res.body.data).to.be.empty
      })
    })

    describe('current date before', () => {
      it("should not return ico", async () => {
        const options = {
          overview: {
            tokenSaleOpeningDate: new Date("15. Nov 2018"),
            tokenSaleClosingDate: new Date("20. Nov 2018"),
          }
        }

        await factory.create("icoVisible", options)

        let res = await request(url, {
          unauth: true
        })

        expect(res.body.data).to.be.empty
      })
    })

    describe('current date after', () => {
      const options = {
        overview: {
          tokenSaleOpeningDate: new Date("1. Nov 2018"),
          tokenSaleClosingDate: new Date("10. Nov 2018"),
        }
      }

      it("should not return ico", async () => {
        await factory.create("icoVisible", options)

        let res = await request(url, {
          unauth: true
        })

        expect(res.body.data).to.be.empty
      })
    })

    describe('date is null', () => {
      const options = {
        overview: {
          symbol: "symbol",
        }
      }

      it("should not return ico", async () => {
        await factory.create("icoVisible", options)

        let res = await request(url, {
          unauth: true
        })

        expect(res.body.data).to.be.empty
      })
    })

  })
})
