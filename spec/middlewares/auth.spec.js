import "../support/hook"
import { createJwt } from "../../app/services/jwt"
import AuthMiddleware from '../../app/middlewares/auth'

describe(__filename, () => {

  describe('valid token', () => {
    it("should verifyJwt", async () => {
      const user = await factory.create("user")
      const token = createJwt(user)

      let req = { header: () => { return `Authorization ${token}` } }
      let res = { status: () => {} }
      let next = () => {}

      await AuthMiddleware(req, res, next)

      expect(req.payload).to.have.property('user_id').eql(user.id)
      expect(req.payload).to.have.property('email').eql(user.email)
    })
  })

  describe('wrong token', () => {
    it("user not exist", async () => {
      const user = await factory.build("user")
      const token = createJwt(user)

      let req = { header: () => { return `Authorization ${token}` } }
      let res = { status: () => {} }
      let next = sinon.spy()

      await AuthMiddleware(req, res, next)

      const error = next.firstCall.args[0].message

      expect(error).to.eql("user not found")
    })

    it("should verifyJwt", async () => {
      let req = { header: () => { return "Authorization test" } }
      let res = { status: () => {} }
      let next = sinon.spy()

      await AuthMiddleware(req, res, next)

      expect(next.calledWithMatch(Error)).to.be.true
    })
  })

  describe('empty token', () => {
    it("should return error", async () => {
      let req = { header: () => { return "" } }
      let res = { status: () => {} }
      let next = sinon.spy()

      await AuthMiddleware(req, res, next)

      expect(next.calledWithMatch(Error)).to.be.true
    })
  })

})
