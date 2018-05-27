import schedule from 'node-schedule'
import { connectDb, closeDb } from "../../init/mongoose"
// import mailchimpSync from '../services/mailchimp/sync'
import backup from '../services/mongo/backup'
// import { addFacebookLikesIco } from '../services/facebook'
// import { addGithubInfo } from '../services/github'
// import { addTwitterFollowersIco } from '../services/twitter'
import checkForNewIco from '../services/ico'

const time = { hour: 12, minute: 30 }

schedule.scheduleJob(time, async () => { await run() })

const run = async () => {
  console.log("start", new Date())

  await connectDb()

  console.log("--------------------")
  console.log("checkForNewIco")
  await checkForNewIco()
  console.log("--------------------")

  // console.log("--------------------")
  // console.log("addFacebookLikesIco")
  // await addFacebookLikesIco()
  // console.log("--------------------")

  // console.log("--------------------")
  // console.log("addGithubInfo")
  // await addGithubInfo()
  // console.log("--------------------")

  // console.log("--------------------")
  // console.log("addTwitterFollowersIco")
  // await addTwitterFollowersIco()
  // console.log("--------------------")

  // console.log("--------------------")
  // console.log("mailchimpSync")
  // await mailchimpSync()
  // console.log("--------------------")

  await closeDb()

  // console.log("--------------------")
  // console.log("backup")
  // await backup()
  // console.log("--------------------")

  console.log("end", new Date())
}

run()
