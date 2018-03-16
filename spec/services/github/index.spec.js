import "../../support/hook"
import { Ico } from "../../../init/mongoose"
import { addGithubInfo } from "../../../app/services/github"
import * as parseInfo from "../../../app/services/github/parse_info"

describe(__filename, () => {
  const url = "https://github.com/url/url"
  const path = "url/url"

  const github = {
    commitsCount: 1,
    contributorsCount: 2,
    watchersCount: 3,
  }

  beforeEach(async () => {
    sinon.stub(parseInfo, "default").withArgs(path).returns(github)
  })

  afterEach(() => {
    parseInfo.default.restore()
  })

  describe('addGithubInfo', () => {
    it("should return valid response", async () => {
      await factory.create("ico", { github: { url }})
      await addGithubInfo()

      let ico = await Ico.findOne()

      expect(ico.github).to.containSubset(github)
    })
  })

})
