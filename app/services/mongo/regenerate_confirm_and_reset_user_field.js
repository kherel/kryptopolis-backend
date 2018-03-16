import crypto from 'crypto'
import { User, connectDb, closeDb } from "../../../init/mongoose"

export default async () => {
  await connectDb()
  await main()
  await closeDb()
}

const main = async () => {
  const users = await User.find()

  await Promise.all(
    users.map(async (user) => {
      user.set({
        cofirmCode: buildCode(),
        resetPasswordToken: buildCode(),
      })

      await user.save()
    })
  )
}

const buildCode = () => {
  return crypto.randomBytes(20).toString('hex')
}
