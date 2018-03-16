import "../../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('sort', () => {
    describe('followers', () => {
      describe('DESC', () => {
        const path = `${url}?include=followers&sort=-followers&fields[ico]=updatedAt,title`

        it("should return valid sort followers", async () => {
          let user1 = await factory.create('user')
          let user2 = await factory.create('user')

          const ico1 = await factory.create("icoVisible", { title: "1" })
          const ico2 = await factory.create("icoVisible", { title: "2", followers: [user1.id, user2.id] })
          const ico3 = await factory.create("icoVisible", { title: "3", followers: [user1.id] })

          let res = await request(path, { unauth: true })

          let ids = res.body.data.map((object) => {
            return object.id
          })

          expect(ids).to.eql([ ico2.id, ico3.id, ico1.id ])
        })
      })

      describe('ASC', () => {
        const path = `${url}?fields[ico]=title&include=followers&sort=followers`

        it("should return valid sort followers", async () => {
          let user1 = await factory.create('user')
          let user2 = await factory.create('user')

          const ico1 = await factory.create("icoVisible")
          const ico2 = await factory.create("icoVisible")
          const ico3 = await factory.create("icoVisible")

          await user1.addFollowers(ico1)
          await user2.addFollowers(ico2)
          await user1.addFollowers(ico2)

          let res = await request(path, { unauth: true })

          let ids = res.body.data.map((object) => {
            return object.id
          })

          expect(ids).to.eql([ ico3.id, ico1.id, ico2.id ])
        })
      })

    })
  })

})
