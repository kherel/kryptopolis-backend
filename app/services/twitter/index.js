import request from 'superagent'
import { Ico } from "../../../init/mongoose"

export const getName = (url) => {
  if (!url) throw new Error("url should be present")
  return url.split("/").pop()
}

export const fetchfollowers = async (path) => {
  let url = `https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${getName(path)}`

  let res = await request.get(url)
  const count = res.body[0].followers_count

  if (!count) throw new Error(res)

  return count
}

export const addTwitterFollowersIco = async () => {
  let icoes = await Ico.find({ "twitter.url": { $ne: "" } })

  await Promise.all(
    icoes.map(async (ico) => {
      try {
        const url = ico.twitter.url

        console.log(`start parse ${url}`)

        const counFollowers = await fetchfollowers(url)

        if (!counFollowers) return

        await ico.twitter.followers.addToSet({
          data: new Date(),
          count: counFollowers,
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

