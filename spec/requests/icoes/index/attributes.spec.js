import "../../../support/hook"

const url = '/v1/icoes'

describe(__filename, () => {

  it("should return valid attributes", async () => {
    await factory.create("icoVisible")
    let res = await request(url, { unauth: true })

    const keys = [
      "source",
      "logo",
      "title",
      "titleUrl",
      "video",
      "description",
      "overview",
      "articles",
      "team",
      "technology",
      "legal",
      "links",
      "local",
      "approve",
      "visibleUser",
      "visibleAdmin",
      "projectName",

      "status",

      "github",
      "facebook",
      "twitter",

      "updatedAt",
      "createdAt",
    ]

    expect(res.body.data[0].attributes).to.have.all.keys(keys)
  })

  describe('fields[ico]', () => {
    const path = `${url}?fields[ico]=title,video,links,logo`

    it("should return only fields", async () => {
      await factory.create("icoVisible")

      let res = await request(path, {
        unauth: true
      })

      const keys = Object.keys(res.body.data[0].attributes)
      const attributes = ["title", "video", "links", "logo"]

      expect(keys).to.eql(attributes)
    })
  })

})
