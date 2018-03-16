import "../../support/hook"
import sync from '../../../app/services/mailchimp/sync'
import * as mailchimp from "../../../app/services/mailchimp/api"

describe(__filename, () => {

  describe('should add email', () => {
    let id = "id"
    let name = "name"
    const listId = "listId"
    const email = "test@test.com"
    const lists = [ { id: id, name: name } ]
    let subscribe, unsubscribe

    beforeEach(async () => {
      sinon.stub(mailchimp, 'fetchLists').returns(lists)
      sinon.stub(mailchimp, 'getListId').returns(listId)
      sinon.stub(mailchimp, 'fetchListMembersEmail').returns([])

      subscribe = sinon.stub(mailchimp, 'subscribe').returns()
      unsubscribe = sinon.stub(mailchimp, 'unsubscribe').returns()
    })

    afterEach(() => {
      mailchimp.fetchLists.restore()
      mailchimp.getListId.restore()
      mailchimp.fetchListMembersEmail.restore()
      mailchimp.subscribe.restore()
      mailchimp.unsubscribe.restore()
    })

    it("should call subscribe", async () => {
      const ico = await factory.create("ico", { title: "test"})
      const user = await factory.create("user", { email })
      await user.addFollowers(ico)
      await sync()

      expect(subscribe.called).to.be.true
    })

    it("should not call unsubscribe", async () => {
      const ico = await factory.create("ico", { title: "test"})
      const user = await factory.create("user", { email })
      await user.addFollowers(ico)
      await sync()

      expect(unsubscribe.called).to.be.false
    })
  })

  describe('unsubscribe', () => {
    let id = "id"
    let name = "name"
    const listId = "listId"
    const email = "test@test.com"
    const lists = [ { id: id, name: name } ]
    let subscribe, unsubscribe

    beforeEach(async () => {
      sinon.stub(mailchimp, 'fetchLists').returns(lists)
      sinon.stub(mailchimp, 'getListId').returns(listId)
      sinon.stub(mailchimp, 'fetchListMembersEmail').returns(["test@test.com", "new@email.com"])

      subscribe = sinon.stub(mailchimp, 'subscribe').returns()
      unsubscribe = sinon.stub(mailchimp, 'unsubscribe').returns()
    })

    afterEach(() => {
      mailchimp.fetchLists.restore()
      mailchimp.getListId.restore()
      mailchimp.fetchListMembersEmail.restore()
      mailchimp.subscribe.restore()
      mailchimp.unsubscribe.restore()
    })

    it("should not call subscribe", async () => {
      const ico = await factory.create("ico", { title: "test"})
      const user = await factory.create("user", { email })
      await user.addFollowers(ico)
      await sync()

      expect(subscribe.called).to.be.false
    })

    it("should call unsubscribe", async () => {
      const ico = await factory.create("ico", { title: "test"})
      const user = await factory.create("user", { email })
      await user.addFollowers(ico)
      await sync()

      expect(unsubscribe.called).to.be.true
    })
  })

  describe('should not change email', () => {
    let id = "id"
    let name = "name"
    const listId = "listId"
    const email = "test@test.com"
    const lists = [ { id: id, name: name } ]
    let subscribe, unsubscribe

    beforeEach(async () => {
      sinon.stub(mailchimp, 'fetchLists').returns(lists)
      sinon.stub(mailchimp, 'getListId').returns(listId)
      sinon.stub(mailchimp, 'fetchListMembersEmail').returns([email])

      subscribe = sinon.stub(mailchimp, 'subscribe').returns()
      unsubscribe = sinon.stub(mailchimp, 'unsubscribe').returns()
    })

    afterEach(() => {
      mailchimp.fetchLists.restore()
      mailchimp.getListId.restore()
      mailchimp.fetchListMembersEmail.restore()
      mailchimp.subscribe.restore()
      mailchimp.unsubscribe.restore()
    })

    it("should call subscribe", async () => {
      const ico = await factory.create("ico", { title: "test"})
      const user = await factory.create("user", { email })
      await user.addFollowers(ico)

      await sync()

      expect(subscribe.called).to.be.false
      expect(unsubscribe.called).to.be.false
    })

    it("should not call unsubscribe", async () => {
      const ico = await factory.create("ico", { title: "test"})
      const user = await factory.create("user", { email })
      await user.addFollowers(ico)
      await sync()

      expect(unsubscribe.called).to.be.false
    })
  })

})
