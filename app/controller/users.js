'use strict';
const Controller = require('egg').Controller;


class UserController extends Controller {
  async findById() {
    const ctx = this.ctx;
    const userId = ctx.params.id
    const user = await ctx.model.User.findById(userId)
    ctx.status = 200
    ctx.body = user
  }
  async createUser() {
    const ctx = this.ctx
    const {username , password } = ctx.request.body
    const createTime = new Date()
    const user =  await ctx.model.User.create({username,password, createTime})
    ctx.status = 201 ;
    ctx.body = user
  }
  async index() {
    const ctx = this.ctx
  
    const users = await ctx.service.user.list()
    console.log(users)
    ctx.response.body =  users
    ctx.status = 201
  }
}
module.exports = UserController