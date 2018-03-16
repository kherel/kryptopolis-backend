import "../../support/hook"

describe(__filename, () => {

  it('attributes', async () => {
    let object = await factory.build("article")

    const attributes = [
      "_id",
      "title",
      "metaTags",
      "keywords",
      "summary",
      "text",
      "image",
      "publish",
      "publishAt",
    ]

    attributes.map((attrubute) => {
      expect(object).to.have.property(attrubute).eql(object[attrubute])
    })
  })

})
