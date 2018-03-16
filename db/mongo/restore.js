import restore from "../../app/services/mongo/restore"

const main = async () => {
  try {
    await restore()
  } catch (err) {
    console.log("error", err)
  }

  process.exit()
}

main()
