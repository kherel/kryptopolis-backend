import mongoose, { connectDb } from "../../../init/mongoose"
import { addGithubInfo } from "../../../app/services/github"

mongoose.set('debug', false)

const run = async () => {
  try {
    await connectDb()
    await addGithubInfo()
  } catch (err) {
    console.log(err.message)
  }

  console.log("END")
  process.exit()
}

run()
