import { merge, pick } from "ramda"
import { News } from "../../init/mongoose"
//import { newsSerializer } from "../serializers"
import { getAttributes, getOptionsFind } from "../services/params"

const filterAttributes = pick([
  "publish",
])

export default {


}
