const UserModel = require('../models/user')

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
