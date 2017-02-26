const crypto = require('crypto')
const IdentityModel = require('../models/identity')

exports.setToken = async (ctx, next) => {
  let name = ctx.request.body.name
  let time = new Date()
  const hash = crypto.createHash('sha256')
  hash.update(name + time)
  const identityEntity = new IdentityModel({
    id: name,
    token: hash.digest('hex')
  })
  await identityEntity.save()
  ctx.cookies.set('token', hash.digest('hex'))
}

exports.checkToken = async (ctx, next) => {
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
