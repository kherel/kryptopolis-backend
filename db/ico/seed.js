import { connectDb } from "../../init/mongoose"
import icoSeed from "../../app/services/ico/seed"

const run = async () => {
  await connectDb()

  try {
    const count = await icoSeed('db/ico/icoes.json')

    console.log(`created ${count} objects`)
  } catch (err) {
    console.log(err.stack)
  }

  process.exit()
}

run()
