import { subscribeNewsLetter } from "../services/mailchimp/api"
import { subscribe } from "../services/mailgun"
import { messageSerializer } from "../serializers"
import { getAttributes } from "../services/params"

export default {

  create: async (req, res, next) => {
    try {
      const { email } = getAttributes(req)

      if (!email) {
        res.status(422)
        return next(new Error("email not found"))
      }

      try {
        await subscribeNewsLetter(email)
        req.log.info(`add subscribe list mailchimp ${email}`)
      } catch (err) {
        res.status(422)
        return next(err)
      }

      try {
        await subscribe(email)
        req.log.info(`send subscribe email ${email}`)
      } catch (err) {
        res.status(422)
        return next(err)
      }

      const response = await messageSerializer("ok")

      res.status(200).json(response)
    } catch(err) {
      return next(err)
    }
  },

}
