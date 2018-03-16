import backup from "../../app/services/mongo/backup"

const main = async () => {
  try {
    await backup()
  } catch (err) {
    console.log("error", err)
  }
}

main()
