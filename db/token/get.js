import { User, connectDb } from "../../init/mongoose"
import factory from '../../spec/factory'
import { createJwt } from '../../app/services/jwt'

const email = "test@test.com"

const run = async () => {
  try {
    await connectDb()

    let user = await User.findOne({ email })

    if (!user) {
      user = await factory.create('user', {
        email,
        password: "123",
        role: "superAdmin",
        editor: true,
      })
    }

    console.log("email", user.email)
    console.log("email", user.role)
    console.log("token", createJwt(user))
  } catch (err) {
    console.log(err.stack)
  }

  process.exit()
}

run()
