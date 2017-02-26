const Koa = require('koa')
const Route = require('koa-router')
const co = require('co')
const path = require('path')
const render = require('koa-swig')
const consoleRouter = require('./routes/consoleRoutes')
const login = require('./routes/firstRoutes')
const mongoose = require('mongoose')
const serve = require('koa-static')
const bodyparser = require('koa-bodyparser')

const app = new Koa()
const router = new Route()
// 设置数据库
mongoose.connect('mongodb://localhost:27017/paper')

app.use(serve(path.join(__dirname, 'statics')))
app.use(bodyparser())

// 设置页面加载资源位置
app.context.render = co.wrap(render({
  root: path.join(__dirname, './views'),
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html'
}))

router.use('/', login.routes(), login.allowedMethods())

router.use('/', consoleRouter.routes(), consoleRouter.allowedMethods())

app.use(router.routes(), router.allowedMethods())

module.exports = app
