import "../../support/hook"
import mailgun from "../../../init/mailgun"
import { reset } from '../../../app/services/mailgun'

describe(__filename, () => {

  describe('reset', () => {
    describe('valid params given', () => {
      let user
      let data = sinon.spy()

      beforeEach(async () => {
        sinon.stub(mailgun, 'messages').onCall(0).returns({ send: data })
        user = await factory.create('user')
      })

      afterEach(() => {
        mailgun.messages.restore()
      })

      it("should send email", async () => {
        await reset(user.email)

        const res = data.args[0][0]

        expect(res.from).to.be.a("string")
        expect(res.to).to.be.a("string")
        expect(res.subject).to.be.a("string")
        expect(res.html).to.be.a("string")
      })
    })

    describe('wrong params given', () => {
      describe('email not found', () => {
        let data = sinon.spy()

        beforeEach(async () => {
          sinon.stub(mailgun, 'messages').onCall(0).returns({ send: data })
        })

        afterEach(() => {
          mailgun.messages.restore()
        })

        it("should send error", async () => {
          try {
            await reset()
          } catch (err) {
            expect(err.message).to.eql("email should be exist")
          }
        })
      })
    })

    describe('wrong params given', () => {
      describe('email not found', () => {
        let data = sinon.spy()

        beforeEach(async () => {
          sinon.stub(mailgun, 'messages').onCall(0).returns({ send: data })
        })

        afterEach(() => {
          mailgun.messages.restore()
        })

        it("should send error", async () => {
          try {
            await reset("test@test.com")
          } catch (err) {
            expect(err.message).to.eql("user by email not found")
          }
        })
      })
    })
  })

})
