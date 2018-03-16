import mongoose, { connectDb } from "../../../init/mongoose"
import { addTwitterFollowersIco } from '../../../app/services/twitter'

mongoose.set('debug', false)

const run = async () => {
  try {
    await connectDb()
    await addTwitterFollowersIco()
  } catch (err) {
    console.log(err.message)
  }

  console.log("END")
  process.exit()
}

run()
