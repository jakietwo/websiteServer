'use strict';
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  accesstoken: 'string',
}

class UserController extends Controller {
  async findById() {
    const ctx = this.ctx;
    const userId = ctx.params.id
    const user = await ctx.model.User.findById(userId)
    ctx.status = 200
    ctx.body = user
  }
  async create() {
    const ctx = this.ctx
    let isAdmin
    const {username , password ,auth } = ctx.request.body
    isAdmin = auth? auth:0 
    const user =  await ctx.service.user.create({username,password, isAdmin})
    ctx.status = 201 ;
    ctx.body = user
  }
  async index() {
    const ctx = this.ctx
    const users = await ctx.service.user.list()
    ctx.response.body =  users
    ctx.status = 201
  }
  async show() {
    const ctx = this.ctx
    const {id} = ctx.params
    const user = await ctx.service.user.show(id)
    ctx.response.body = user
    ctx.status = 201
  }
  async update() {
    const ctx = this.ctx
    const {id} = ctx.request.body
    const data = ctx.request.body
    const user = await ctx.service.user.update(id, data)
    ctx.response.body = user
    ctx.status = 201
  }
  async destory() {
    const ctx = this.ctx
    const {id} = ctx.request.body
    const user = await ctx.service.user.destory(id)
    ctx.response.body = user
    ctx.status = 201
  }
 
}
module.exports = UserController