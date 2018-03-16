import "../../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  describe('DESC', () => {
    const path = `${url}?fields[ico]=title&sort=-title`

    it("should return valid sort followers", async () => {
      const ico1 = await factory.create("icoVisible", { title: "title"})
      const ico2 = await factory.create("icoVisible", { title: "ztitle"})

      const res = await request(path, { unauth: true })
      const ids = res.body.data.map((object) => { return object.id })

      expect(ids).to.eql([ ico2.id, ico1.id ])
    })
  })

  describe('ASC', () => {
    const path = `${url}?fields[ico]=title&sort=title`

    it("should return valid sort followers", async () => {
      const ico1 = await factory.create("icoVisible", { title: "title"})
      const ico2 = await factory.create("icoVisible", { title: "ztitle"})

      const res = await request(path, { unauth: true })
      const ids = res.body.data.map((object) => { return object.id })

      expect(ids).to.eql([ ico1.id, ico2.id ])
    })
  })

})
