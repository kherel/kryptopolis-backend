import { Ico } from "../../../init/mongoose"
import { parseUrl, regExpGithub } from "./helpers"
import parseInfo from "./parse_info"

const addGithubInfo = async () => {
  let icoes = await Ico.find({ "github.url": regExpGithub })

  await Promise.all(
    icoes.map(async (ico) => {
      try {
        console.log("start parse", ico.github.url)

        const githubInfo = await parseInfo(parseUrl(ico.github.url))

        if (githubInfo) {
          await ico.update({ github: githubInfo })
          console.log("success update", ico.id, ico.github)
        }
      } catch (err) {
        console.log("---------")
        console.log(err.message)
        console.log(ico.title, ico.id)
        console.log("---------")
      }
    })
  )
}

export default addGithubInfo
