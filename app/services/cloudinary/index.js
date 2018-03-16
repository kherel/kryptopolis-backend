import { Ico } from "../../../init/mongoose"
import cloudinary from "../../../init/cloudinary"

export const upload = async (url, public_id) => {
  let res = await cloudinary.uploader.upload(url, null, {
    public_id: public_id.toLowerCase()
  })

  if (!res.secure_url) throw new Error(res)

  return res.secure_url
}

export const updateUrlOnCloudinary = async () => {
  let icoes = await Ico.find({ logo: new RegExp("tokenmarket.net") }, "logo title", null)

  console.log(`find ${icoes.length} objects`)

  await Promise.all(
    icoes.map(async (ico) => {
      try {
        console.log("start upload", ico.logo)
        let logo = await upload(ico.logo, ico.title)

        await ico.update({ logo })

        console.log("end upload", logo)
      } catch (err) {
        console.log(err)
      }
    })
  )
}

export default cloudinary
