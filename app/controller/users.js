
const Controller = require('egg').Controller;


class UserController extends Controller {
  async findById() {
    const ctx = this.ctx;
    const userId = ctx.params.id
    const user = await ctx.model.Users.findById(userId)
    ctx.status = 200
    ctx.body = user
  }
  async createUser() {
    const ctx = this.ctx
    const {username , password ,createTime} = ctx.request.body
    const user =  await ctx.model.Users.create({username,password, createTime})
    ctx.status = 201 ;
    ctx.body = user
  }
}
module.exports = UserController