import "../../../../support/hook"

const url = '/v1/users'

describe(__filename, () => {

  describe('updatedAt', () => {
    describe('DESC', () => {
      const path = `${url}?sort=-updatedAt`

      afterEach(( ) => { timekeeper.reset() })

      it("should return valid sort followers", async () => {
        timekeeper.freeze(new Date("12 Nov 2011 01:00:00"))
        const admin = await factory.create("superAdmin")

        timekeeper.freeze(new Date("12 Nov 2015 01:00:00"))
        const user2 = await factory.create("user")

        timekeeper.freeze(new Date("12 Nov 2010 01:00:00"))
        const user3 = await factory.create("user")

        let res = await request(path, { user: admin })

        const ids = res.body.data.map((object) => { return object.id })

        expect(ids).to.eql([ user2.id, admin.id, user3.id ])
      })
    })

    describe('ASC', () => {
      const path = `${url}?sort=updatedAt`

      it("should return valid sort followers", async () => {
        timekeeper.freeze(new Date("12 Nov 2011 01:00:00"))
        const admin = await factory.create("superAdmin")

        timekeeper.freeze(new Date("12 Nov 2015 01:00:00"))
        const user2 = await factory.create("user")

        timekeeper.freeze(new Date("12 Nov 2010 01:00:00"))
        const user3 = await factory.create("user")

        let res = await request(path, { user: admin })

        const ids = res.body.data.map((object) => { return object.id })

        expect(ids).to.eql([ user3.id, admin.id, user2.id ])
      })
    })

  })
})
