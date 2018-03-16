import { fetchLists, getListId } from '../../../app/services/mailchimp/api'
import settings from '../../../settings/settings'

const { listInstance } = settings.mailchimp

describe(__filename, () => {

  describe('fetchLists', () => {
    const url = `https://${listInstance}.api.mailchimp.com`
    const path = `/3.0/lists?count=1000`

    it("should return string", async () => {
      let res = nock(url).get(path).reply(200, { lists: {} })
      await fetchLists()
      expect(res.isDone()).to.be.true
    })
  })

  describe('getListId', () => {

    afterEach(() => {
      nock.cleanAll()
    })

    describe('should not create list', () => {
      const url = `https://${listInstance}.api.mailchimp.com`
      const path = `/3.0/lists`

      const id = "123"
      const name = "test_token_test"
      const lists = [{ id, name }]

      it("should not call to lists", async () => {
        let res = nock(url).post(path).reply(200, { lists: {} })
        await getListId(lists, "test-token-test")

        expect(res.isDone()).to.be.false
      })
      it("should return string", async () => {
        let result = await getListId(lists, "test-token-test")

        expect(result).to.eql(id)
      })
    })

    describe('should create list', () => {
      const url = `https://${listInstance}.api.mailchimp.com`
      const path = `/3.0/lists`

      const id = "123"
      const name = "test-token-test"

      it("should return string", async () => {
        let res = nock(url).post(path).reply(200, { id: id })

        let result = await getListId([], name)

        expect(res.isDone()).to.be.true
        expect(result).to.eql(id)
      })
    })
  })

  xdescribe('fetchListMembersEmail', () => {
  })

  xdescribe('subscribe', () => {
  })

  xdescribe('subscribeNewsLetter', () => {
  })

  xdescribe('unsubscribe', () => {
  })

})
