const UserModel = require('../models/user')
const setToken = require('../middleware/hashToken')

exports.register = async(ctx, next) => {
  const user = ctx.request.body.user
  const password = ctx.request.body.password
  const userEntity = new UserModel({
    name: user,
    password: password
  })
  await userEntity.save()
  ctx.body = {
    success: true
  }
  return ctx.body
}

exports.login = async(ctx, next) => {
  const result = await UserModel.findOne({
    name: ctx.request.body.user,
    password: ctx.request.body.password
  })

  await setToken.setToken

  if (result) {
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        name: ctx.request.body.user
      }
    }
  }
}
