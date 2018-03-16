import "../../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('updatedAt', () => {
    describe('DESC', () => {
      const path = `${url}?fields[ico]=title,updatedAt&sort=-updatedAt`

      afterEach(( ) => { timekeeper.reset() })

      it("should return valid sort followers", async () => {
        timekeeper.freeze(new Date("12 Nov 2011 01:00:00"))
        const ico1 = await factory.create("icoVisible")

        timekeeper.freeze(new Date("12 Nov 2015 01:00:00"))
        const ico2 = await factory.create("icoVisible")

        timekeeper.freeze(new Date("12 Nov 2010 01:00:00"))
        const ico3 = await factory.create("icoVisible")

        let res = await request(path, { unauth: true })

        const ids = res.body.data.map((object) => { return object.id })

        expect(ids).to.eql([ ico2.id, ico1.id, ico3.id ])
      })
    })

    describe('ASC', () => {
      const path = `${url}?fields[ico]=title,updatedAt&sort=updatedAt`

      it("should return valid sort followers", async () => {
        timekeeper.freeze(new Date("12 Nov 2011 01:00:00"))
        const ico1 = await factory.create("icoVisible")

        timekeeper.freeze(new Date("12 Nov 2015 01:00:00"))
        const ico2 = await factory.create("icoVisible")

        timekeeper.freeze(new Date("12 Nov 2010 01:00:00"))
        const ico3 = await factory.create("icoVisible")

        let res = await request(path, { unauth: true })

        const ids = res.body.data.map((object) => { return object.id })

        expect(ids).to.eql([ ico3.id, ico1.id, ico2.id ])
      })
    })

  })
})
