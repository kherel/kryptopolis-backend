import { User } from "../../../init/mongoose"
import "../../support/hook"
import { findOrCreateUser } from "../../../app/middlewares/passport/facebook"

describe(__filename, () => {
  describe("valid params given", () => {
    describe("without user", () => {
      it("should return user", async () => {
        let accessToken = {}
        let refreshToken = {}
        let done = sinon.spy()
        let profile = {
          id: "234",
          emails: [{value: "test@test.com"}],
          _json: { id: "123", test: "test" },
          displayName: "displayName"
        }

        await findOrCreateUser(accessToken, refreshToken, profile, done)

        const user = done.firstCall.args[1]

        expect(user).to.have.property("_id")
        expect(user).to.have.property("password")
        expect(user).to.have.property("provider").eql("facebook")
        expect(user).to.have.property("facebook").eql(profile._json)
        expect(user).to.have.property("name").eql(profile.displayName)
        expect(await User.findById(user.id)).to.exist
      })
    })

    describe("with user", () => {
      it("should return user", async () => {
        let accessToken = {}
        let refreshToken = {}
        let done = sinon.spy()
        let profile = {
          id: "234",
          emails: [{value: "test@test.com"}],
          _json: { id: "234", test: "test" },
          displayName: "displayName"
        }
        let user = await factory.create("user", { facebook: profile })

        await findOrCreateUser(accessToken, refreshToken, profile, done)

        const resUser = done.firstCall.args[1]

        expect(resUser).to.have.property("_id").eql(user._id)
        expect(await User.findById(resUser.id)).to.exist
      })
    })
  })

  describe("wrong params given", () => {
    describe("email not found", () => {
      it("should return error", async () => {
        let accessToken = {}
        let refreshToken = {}
        let done = sinon.spy()
        let profile = {
          id: "234",
          _json: { id: "234", test: "test" },
          displayName: "displayName"
        }
        await findOrCreateUser(accessToken, refreshToken, profile, done)

        const error = done.firstCall.args[0]

        expect(error.message).to.eql("email not found")
      })
    })

    describe("email already exit", () => {
      it("should return error", async () => {
        let user = await factory.create("user")
        let accessToken = {}
        let refreshToken = {}
        let done = sinon.spy()
        let profile = {
          id: "234",
          emails: [{ value: user.email }],
          _json: { id: "234", test: "test" },
          displayName: "displayName"
        }

        await findOrCreateUser(accessToken, refreshToken, profile, done)

        const error = done.firstCall.args[0]

        expect(error.message).to.eql("email already exist")
      })
    })
  })
})
