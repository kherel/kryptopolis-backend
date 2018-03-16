import backup from "mongodb-backup"
import settings from "../../../settings/settings"

export default () => {
  const data = new Date().toISOString()

  console.log("start backup", data)

  return new Promise((resolve, reject) => {
    backup({
      uri: settings.dbUrl,
      root: `./db/dump/${data}`,
      callback: ((err) => {
        if (err) { return reject(err) }
        console.log("backup finished", data)
        return resolve(null)
      }),
    })
  })
}
