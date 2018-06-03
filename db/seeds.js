import { connectDb, closeDb } from "../init/mongoose"
import factory from '../spec/factory'

const create = async () => {
  try {
    await connectDb()

    // for (let i = 0; i < 50; ++i)
    //   await factory.create('news')

    const user1 = await factory.create('user', { email: "user@test.com", password: "123", role: "user" })
    const user2 = await factory.create('user', { email: "admin@test.com", password: "123", role: "admin" })
    const user3 = await factory.create('user', { email: "superAdmin@test.com", password: "123", role: "superAdmin" })

    const ico1 = await factory.create('icoVisible')
    const ico2 = await factory.create('icoVisible')
    const ico3 = await factory.create('icoVisible')

    await user1.addFollowers(ico1)
    await user2.addFollowers(ico2)
    await user3.addFollowers(ico3)

    await closeDb()

    console.log("models created")
  } catch (err) {
    console.log(err.stack)
  }

  process.exit()
}

create()
