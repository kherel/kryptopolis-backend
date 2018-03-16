import { isEmpty } from "ramda"

export default async (object) => {

  if (object.title == "Akasha") {
    let res = object.team.Members.split(",")

    let result = res.map((object) => {
      const name = object.replace(/^\s*/, "").replace(/\s*$/, "")
      return { name }
    })

    object.team.members = result
    delete object.team.Members

    if (object.team['Country of origin'] != "(data missing)") {
      object.team.countryOfOrigin = object.team['Country of origin']
    }

    delete object.team['Country of origin']

    return object
  }

  if (!object.team.Members) {
    console.log("ico without members", object.title)
    return object
  }

  let members = object.team.Members.split("\n")

  if (members == []) return object

  let result = await Promise.all(
    members.map(async (objects) => {

      const res = await objects.split(/ [-–] /)

      if (res.length == 1) {
        let name = await res[0].replace(/^\s*/, "").replace(/\s*$/, "")

        if (!isEmpty(name)) {
          let short = res[0].split(/-/)

          if (!isEmpty(short[0]) && !isEmpty(short[1])) {
            const name = short[0].replace(/^\s*/, "").replace(/\s*$/, "")
            const position = short[1] && short[1].replace(/^\s*/, "").replace(/\s*$/, "") || null

            return {
              name,
              position,
            }
          } else {
            return {
              name,
            }
          }
        }
      }

      if (res.length == 2) {
        const name = await res[0].replace(/^\s*/, "").replace(/\s*$/, "")
        const position = await res[1].replace(/^\s*/, "").replace(/\s*$/, "")

        return {
          name,
          position,
        }
      }

    })
  )

  result = result.filter((n) => { return n != undefined })

  object.team.members = result
  delete object.team.Members

  if (object.team['Country of origin'] != "(data missing)") {
    object.team.countryOfOrigin = object.team['Country of origin']
  }

  delete object.team['Country of origin']

  return object
}
