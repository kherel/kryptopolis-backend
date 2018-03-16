import { Ico, connectDb } from "../../init/mongoose"

const run = async () => {
  try {
    await connectDb()
    console.log("count Ico", await Ico.count())
    await Ico.remove()

    console.log("ico remove")
  } catch (err) {
    console.log(err.stack)
  }

  process.exit()
}

run()
