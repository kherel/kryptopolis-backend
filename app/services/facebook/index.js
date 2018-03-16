import { Ico } from "../../../init/mongoose"
import facebook from '../../../init/facebook'

export const fetchLikes = async (id) => {
  let res = await facebook.api(id, { fields: "fan_count" })

  if (!res.fan_count) throw new Error(res)

  return res.fan_count
}

export const addFacebookLikesIco = async () => {
  let icoes = await Ico.find({ "facebook.url": { $ne: "" } })

  await Promise.all(
    icoes.map(async (ico) => {
      try {
        const url = ico.facebook.url

        console.log(`start parse ${url}`)

        const counLike = await fetchLikes(url)

        if (!counLike) return

        await ico.facebook.likes.addToSet({
          data: new Date(),
          count: counLike,
        })

        await ico.save()
      } catch (err) {
        console.log("---------")
        console.log(err.message)
        console.log(ico.title, ico.id)
        console.log("---------")
      }
    })
  )

}
