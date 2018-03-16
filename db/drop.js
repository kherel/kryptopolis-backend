import { connectDb, dropDb } from "../init/mongoose"

const run = async () => {
  try {
    await connectDb()
    await dropDb()

    console.log("drop all documents succsess")

  } catch (err) {
    console.log(err.stack)
  }

  process.exit()
}

run()
