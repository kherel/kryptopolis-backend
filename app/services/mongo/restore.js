import restore from "mongodb-restore"
import fs from "fs"
import settings from "../../../settings/settings"

const getLastBackup = async () => {
  let res = await fs.readdirSync("./db/dump")
  return res.pop()
}

export default async () => {
  const dir = await getLastBackup()
  const dbName = settings.dbUrl.split("/").pop()
  const root = `./db/dump/${dir}/${dbName}`

  console.log("start restore db", root)

  return new Promise((resolve) => {
    restore({
      uri: settings.dbUrl,
      root: root,
      callback: ((err) => {
        if (err) throw err
        console.log("finished restore db", root)
        resolve(null)
      }),
    })
  })
}
