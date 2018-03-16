import settings from '../settings/settings'

import AuthMiddleware from '../app/middlewares/auth'
import GetUserMiddleware from '../app/middlewares/get_user'
import AbilityMiddleware from '../app/middlewares/ability'
import PassportMiddleware from '../app/middlewares/passport'

import AuthController from '../app/controllers/auth'
import UsersController from '../app/controllers/users'
import IcoesController from '../app/controllers/icoes'
import ArticlesController from '../app/controllers/articles'
import NewsController from '../app/controllers/news'
import VideosController from '../app/controllers/videos'
import MeController from '../app/controllers/me'
import MeFollowersController from '../app/controllers/me/followers'
import MePasswordController from '../app/controllers/me/password'
import SubscribeController from '../app/controllers/subscribe'
import FeedController from '../app/controllers/feed'

import { swaggerUiServe, swaggerUiSetup } from '../init/swagger'

export default (app) => {

  app.get('/', (req, res) => {
    res.json({
      servise: settings.name,
      current_version: '/v1',
      swagger: '/api-docs',
    })
  })

  app.use("/api-docs", swaggerUiServe, swaggerUiSetup)

  app.post('/v1/subscribe', SubscribeController.create)

  app.get('/v1/me', AuthMiddleware, MeController.show)
  app.delete('/v1/me', AuthMiddleware, MeController.delete)
  app.put('/v1/me', AuthMiddleware, AbilityMiddleware, MeController.update)

  app.put('/v1/me/password', AuthMiddleware, MePasswordController.update)

  app.post('/v1/me/followers', AuthMiddleware, MeFollowersController.create)
  app.delete('/v1/me/followers', AuthMiddleware, MeFollowersController.delete)

  app.get('/v1/users', AuthMiddleware, AbilityMiddleware, UsersController.index)
  app.get('/v1/users/:id', AuthMiddleware, AbilityMiddleware, UsersController.show)
  app.post('/v1/users', UsersController.create)
  app.put('/v1/users/:id', AuthMiddleware, AbilityMiddleware, UsersController.update)
  app.delete('/v1/users/:id', AuthMiddleware, AbilityMiddleware, UsersController.delete)

  app.get('/v1/icoes', GetUserMiddleware, AbilityMiddleware, IcoesController.index)
  app.get('/v1/icoes/:titleUrl', GetUserMiddleware, AbilityMiddleware, IcoesController.show)
  app.post('/v1/icoes', AuthMiddleware, IcoesController.create)
  app.put('/v1/icoes/:id', AuthMiddleware, AbilityMiddleware, IcoesController.update)
  app.delete('/v1/icoes/:id', AuthMiddleware, AbilityMiddleware, IcoesController.delete)

  app.get('/v1/articles', ArticlesController.index)
  app.get('/v1/articles/:id', ArticlesController.show)
  app.post('/v1/articles', AuthMiddleware, AbilityMiddleware, ArticlesController.create)
  app.put('/v1/articles/:id', AuthMiddleware, AbilityMiddleware, ArticlesController.update)
  app.delete('/v1/articles/:id', AuthMiddleware, AbilityMiddleware, ArticlesController.delete)

  app.get('/v1/news', NewsController.index)
  app.get('/v1/news/:id', NewsController.show)
  app.post('/v1/news', AuthMiddleware, AbilityMiddleware, NewsController.create)
  app.put('/v1/news/:id', AuthMiddleware, AbilityMiddleware, NewsController.update)
  app.delete('/v1/news/:id', AuthMiddleware, AbilityMiddleware, NewsController.delete)
  
  app.get('/v1/videos', VideosController.index)
  app.get('/v1/videos/:id', VideosController.show)
  app.post('/v1/videos', AuthMiddleware, AbilityMiddleware, VideosController.create)
  app.put('/v1/videos/:id', AuthMiddleware, AbilityMiddleware, VideosController.update)
  app.delete('/v1/videos/:id', AuthMiddleware, AbilityMiddleware, VideosController.delete)

  app.put('/v1/auth/token', AuthController.createToken)

  app.put('/v1/auth/send_confirm', AuthMiddleware, AuthController.sendConfirm)
  app.post('/v1/auth/confirm', AuthController.confirm)

  app.put('/v1/auth/send_reset_password', AuthController.sendResetPassword)
  app.post('/v1/auth/reset_password', AuthController.resetPassword)

  app.post(
    '/v1/auth/google',
    PassportMiddleware.authenticate('google-token'),
    AuthController.passport
  )

  app.post(
    '/v1/auth/facebook',
    PassportMiddleware.authenticate('facebook-token'),
    AuthController.passport
  )

  app.post(
    '/v1/auth/twitter/reverse',
    AuthController.twitterReverse
  )

  app.post('/v1/auth/twitter',
    AuthController.twitterVerifer,
    PassportMiddleware.authenticate('twitter-token', { session: false }),
    AuthController.passport
  )

  app.get('/v1/feed', FeedController.index)

  app.use((req, res, next) => {
    res.status(404)
    next(new Error("not found url"))
  })

  app.use((err, req, res) => {
    req.log.error(err.stack)
    if (res.statusCode == 200) 
      res.status(500)
    res.json({ "error": err.message })
  })

}
