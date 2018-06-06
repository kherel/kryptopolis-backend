import schedule from 'node-schedule'
import { connectDb, closeDb } from "../../init/mongoose"
import checkForUpdatedTickers from '../services/ticker'

var rule = new schedule.RecurrenceRule();

rule.minute = new schedule.Range(0, 59, 5);

schedule.scheduleJob(rule, async () => { await run() })

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
