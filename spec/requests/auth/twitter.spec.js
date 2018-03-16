import "../../support/hook"

const url = "/v1/auth/twitter"

describe(__filename, () => {
  describe(`POST ${url}`, () => {

    beforeEach(async () => {
      const user = await factory.create("user")
      const response = `user_id=${user.id}&oauth_token_secret=oauth_token_secret&oauth_token=oauth_token`
      nock("https://api.twitter.com").post('/oauth/access_token?oauth_verifier').reply(200, response)
    })

    afterEach(() => { nock.cleanAll() })

    it("should call request.post", async () => {
      let res = await request(url, {
        method: "post",
        unauth: true,
      })

      expect(res.body.data.attributes).to.have.property('value')
    })

  })
})
