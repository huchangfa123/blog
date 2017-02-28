const Router = require('koa-router')
const UserController = require('../controller/UserController')
const IdentityModel = require('../models/identity')

const router = new Router()

const logins = ['/', 'login']

router.post('register', UserController.register)

router.post('login', UserController.login)

router.get('register', async(ctx, next) => {
  await ctx.render('register')
})

router.get(logins, async (ctx, next) => {
  const token = ctx.cookies.get('token')
  const Permission = await IdentityModel.findOne({token: token})
  if (Permission) {
    await ctx.redirect('first')
  } else await ctx.render('login')
})

module.exports = router

