import { Ico, connectDb, closeDb } from "../../../init/mongoose"

export default async () => {
  await connectDb()
  await main()
  await closeDb()
}

const main = async () => {
  const icoes = await Ico.find()

  await Promise.all(
    icoes.map(async (ico) => {
      await ico.set({ followersCount: ico.followers.length })
      await ico.save()
    })
  )
}
