import "../../support/hook"
import githubParse from "../../../app/services/github/parse_info"

describe(__filename, () => {
    const url = `https://api.github.com/`
    const path = "test/test"

    beforeEach(() => {
      const uri = `/repos/${path}/stats/participation`
      nock(url).get(uri).reply(200, {})
    })

    beforeEach(() => {
      const uri = `/repos/${path}/contributors`
      nock(url).get(uri).reply(200, {})
    })

    beforeEach(() => {
      const uri = `/repos/${path}`
      nock(url).get(uri).reply(200, {})
    })

    beforeEach(() => {
      const uri = new RegExp(`page`)

      const body = [{
        commit: {
          committer: {
            date: new Date()
          }
        }
      }]

      nock(url).get(uri).reply(200, body)
      nock(url).get(uri).reply(200, body)
    })

  describe('', () => {
    it("should ", async () => {
      let res = await githubParse(path)

      const result = [
        "commitsData",
        "watchersCount",
        "stargazersCount",
        "forksCount",
        "openIssues",
        "contributorsCount",
        "commitsCount",
      ]

      expect(res).to.have.keys(result)
    })
  })

})
