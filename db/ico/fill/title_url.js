import snake from 'to-snake-case'
import { Ico, connectDb, closeDb } from "../../../init/mongoose"

const main = async () => {
  await connectDb()

  const icoes = await Ico.find()

  await Promise.all(
    icoes.map(async (ico) => {
      await ico.update({ titleUrl: snake(ico.title) })
    })
  )

  await closeDb()

  console.log("add titleUrl finished")
  process.exit()
}

main()
