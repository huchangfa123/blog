const Router = require('koa-router')
const UserController = require('../app/controller/UserController')

const router = new Router()

const a = ['/', 'login']

router.post('register', UserController.register)

router.post('login', UserController.login)

router.get('register', async(ctx, next) => {
  await ctx.render('register')
})

router.get(a, async (ctx, next) => {
  await ctx.render('login')
})

module.exports = router

