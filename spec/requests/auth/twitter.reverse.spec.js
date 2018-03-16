import "../../support/hook"

const url = "/v1/auth/twitter/reverse"

describe(__filename, () => {

  beforeEach(() => {
    nock("https://api.twitter.com").post('/oauth/request_token').reply(200, "key=value")
  })

  it("should call request.post", async () => {
    let res = await request(url, {
      method: "post",
      unauth: true,
    })

    expect(res.body).to.have.property('key').eql("value")
  })

})
