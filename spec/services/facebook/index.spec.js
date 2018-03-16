import "../../support/hook"
import { Ico } from "../../../init/mongoose"
import { addFacebookLikesIco, fetchLikes } from "../../../app/services/facebook"

describe(__filename, () => {
  const fan_count = 123
  const url = "https://www.facebook.com/ArenaPlatform/"

  beforeEach(() => {
    nock(/[\w\:\/\.]+/).get(/[\w\:\/\.]+/).reply(200, { fan_count })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchLikes', () => {
    it("should return valid response", async () => {
      let res = await fetchLikes(url)

      expect(res).to.eql(fan_count)
    })
  })

  describe('addFacebookLikesIco', () => {
    it("should return valid response", async () => {
      const url = "http://test/test"
      let ico = await factory.create("ico", { facebook: { url: url } })

      await addFacebookLikesIco()

      ico = await Ico.findById(ico.id)

      const result = ico.facebook.likes[0]

      expect(result.count).to.eql(fan_count)
      expect(result.data).to.instanceOf(Date)
    })
  })

})
