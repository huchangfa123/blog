const Koa = require('koa')
const Route = require('koa-router')
const co = require('co')
const path = require('path')
const render = require('koa-swig')// set template
const consoleRouter = require('./routes/consoleRoutes')
const login = require('./routes/loginRoutes')
const mongoose = require('mongoose')// db
const serve = require('koa-static')// set static file
const bodyparser = require('koa-bodyparser')// get body
const Token = require('./middleware/hashToken')

const app = new Koa()
const firstrouter = new Route()
const afterrouter = new Route()

mongoose.Promise = require('bluebird')
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

firstrouter.use('/', login.routes(), login.allowedMethods())

app.use(firstrouter.routes(), firstrouter.allowedMethods())

app.use(Token.checkToken)

afterrouter.use('/', consoleRouter.routes(), consoleRouter.allowedMethods())

app.use(afterrouter.routes(), afterrouter.allowedMethods())

module.exports = app
