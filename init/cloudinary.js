import cloudinary from "cloudinary"
import settings from "../settings/settings"

cloudinary.config({
  cloud_name: settings.cloudinary.name,
  api_key: settings.cloudinary.key,
  api_secret: settings.cloudinary.secret,
})

export default cloudinary
