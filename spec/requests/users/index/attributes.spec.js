import "../../../support/hook"

const url = '/v1/users'

describe(__filename, () => {

  it("should return valid attributes", async () => {
    const user = await factory.create("user")
    let res = await request(url, { user })

    const keys = [
      'name',
      'email',
      "editor",
      "articles",
      "provider",
      "role",
      "createdAt",
      "updatedAt",
      "cofirmEmail",
    ]

    expect(res.body.data[0].attributes).to.have.all.keys(keys)
  })

})
