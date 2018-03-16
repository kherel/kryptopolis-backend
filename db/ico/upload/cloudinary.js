import mongoose, { connectDb } from "../../../init/mongoose"
import { updateUrlOnCloudinary } from "../../../app/services/cloudinary"

mongoose.set('debug', false)

const main = async () => {
  try {
    await connectDb()
    await updateUrlOnCloudinary()
  } catch (err) {
    console.log(err.message)
  }

  console.log("upload on cloudinary finished")
  process.exit()
}

main()
