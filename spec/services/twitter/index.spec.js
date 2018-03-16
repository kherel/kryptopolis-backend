import "../../support/hook"
import { Ico } from "../../../init/mongoose"
import { addTwitterFollowersIco, fetchfollowers, getName } from "../../../app/services/twitter"

describe(__filename, () => {
  const followers_count = 123
  const url = "https://www.facebook.com/ArenaPlatform/"

  beforeEach(() => {
    let res = [{ followers_count: followers_count }]
    nock(/[\w\:\/\.]+/).get(/[\w\:\/\.]+/).reply(200, res)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('getName', () => {
    it("should return valid response", async () => {
      let url = "https://twitter.com/beone_co"
      let result = "beone_co"

      let res = await getName(url)

      expect(res).to.eql(result)
    })
  })

  describe('fetchfollowers', () => {
    it("should return valid response", async () => {
      let res = await fetchfollowers(url)

      expect(res).to.eql(followers_count)
    })
  })

  describe('addTwitterFollowersIco', () => {
    it("should return valid response", async () => {
      const url = "http://test/test"
      let ico = await factory.create("ico", { twitter: { url: url } })
      await addTwitterFollowersIco()

      ico = await Ico.findById(ico.id)

      const result = ico.twitter.followers[0]

      expect(result.count).to.eql(followers_count)
      expect(result.data).to.instanceOf(Date)
    })
  })

})
