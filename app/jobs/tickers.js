import schedule from 'node-schedule'
import { connectDb, closeDb } from "../../init/mongoose"
import checkForUpdatedTickers from '../services/ticker'

const time = { minute: 5, second: 30 }

schedule.scheduleJob(time, async () => { await run() })

const run = async () => {
  console.log("start", new Date())

  await connectDb()

  console.log("--------------------")
  console.log("checkForUpdatedTickers")
  await checkForUpdatedTickers()
  console.log("--------------------")

  await closeDb()

  console.log("end", new Date())
}

run()
