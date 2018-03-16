import { times } from "ramda"
import { Ico, connectDb, closeDb } from "../../../init/mongoose"
import factory from '../../../spec/factory'

export default async () => {
  await connectDb()
  await main()
  await closeDb()
}

const main = async () => {
  const icoes = await Ico.find().limit(10)

  await Promise.all(
    icoes.map(async (ico) => {
      const number = getRandomInt(1, 10)

      await Promise.all(
        times(async () => {
          const user = await factory.create("userWithEmailFake")
          await user.addFollowers(ico)
        }, number)
      )
    })
  )
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}
