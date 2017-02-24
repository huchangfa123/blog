const Router = require('koa-router')
const UserController = require('../app/controller/UserController')

const router = new Router()

const logins = ['/', 'login']

router.post('register', UserController.register)

router.post('login', UserController.login)

router.get('register', async(ctx, next) => {
  await ctx.render('register')
})

router.get(logins, async (ctx, next) => {
  await ctx.render('login')
})

router.get('first', async (ctx, next) => {
  await ctx.render('consoleFirst')
})

router.get('write', async (ctx, next) => {
  await ctx.render('write')
})

router.get('set', async (ctx, next) => {
  await ctx.render('set')
})

module.exports = router

