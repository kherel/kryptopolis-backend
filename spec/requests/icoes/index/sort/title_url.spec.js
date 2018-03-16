import "../../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('ASC', () => {
    const path = `${url}?fields[ico]=title&sort=titleUrl`

    it("should return valid sort followers", async () => {
      const ico1 = await factory.create("icoVisible", { title: "Zen Protocol"})
      const ico2 = await factory.create("icoVisible", { title: "ZrCoin"})
      const ico3 = await factory.create("icoVisible", { title: "beeqb"})

      const res = await request(path, { unauth: true })
      const ids = res.body.data.map((object) => { return object.id })

      expect(ids).to.eql([ ico3.id, ico1.id, ico2.id  ])
    })
  })

})
