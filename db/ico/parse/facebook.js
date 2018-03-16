import mongoose, { connectDb } from "../../../init/mongoose"
import { addFacebookLikesIco } from '../../../app/services/facebook'

mongoose.set('debug', false)

const run = async () => {
  try {
    await connectDb()
    await addFacebookLikesIco()
  } catch (err) {
    console.log(err.message)
  }

  console.log("END")
  process.exit()
}

run()
