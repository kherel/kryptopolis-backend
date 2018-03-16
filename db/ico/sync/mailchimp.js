import { connectDb, closeDb } from "../../../init/mongoose"
import mailchimpSync from '../../../app/services/mailchimp/sync'

const main = async () => {
  try {
    await connectDb()
    await mailchimpSync()
    await closeDb()

    console.log("sync with mailchimp finished")
  } catch (err) {
    console.log(err.message)
  }
  process.exit()
}

main()
