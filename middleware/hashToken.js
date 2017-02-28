const crypto = require('crypto')
const IdentityModel = require('../models/identity')

exports.setToken = async (ctx, next) => {
  const date = new Date().getTime() + 5184000000
  let name = ctx.request.body.user
  let time = new Date()
  const hash = crypto.createHash('sha256')
  // get the token code
  hash.update(name + time)
  const tokenkey = hash.digest('hex')
  // save user and token list
  const identityEntity = new IdentityModel({
    id: name,
    token: tokenkey
  })
  await identityEntity.save()
  // set token in cookies
  ctx.cookies.set('token', tokenkey,
    {
      httpOnly: false,
      overwrite: true,
      expires: new Date(date)
    })
  ctx.status = 200
}

exports.checkToken = async (ctx, next) => {
  // get token from cookies
  const token = ctx.cookies.get('token')
  const Permission = await IdentityModel.find({token: token})
  if (Permission) {
    next()
  } else {
    ctx.status = 401
    ctx.body = {
      success: false,
      message: '授权失败'
    }
  }
}
