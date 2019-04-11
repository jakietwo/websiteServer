'use strict';

const Service = require('egg').Service;
const dayjs  = require('dayjs')
const uuidv1 = require('uuid/v1')
class User extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', {id: 1})
    return {user}
  }
  async list () {
    const ctx = this.ctx
    return await ctx.model.User.findAll({
      attributes: ['id', 'username', 'auth','createTime', 'updateTime']
    })
  }
  async show (id) {
    const ctx = this.ctx
    return await ctx.model.User.findByPk(id ,{
      attributes: ['id','username', 'auth', 'createTime', 'updateTime']
    })
  }
  async destroy(id) {
    const ctx = this.ctx
    return await ctx.model.User.destroy({
      where: {
        id: id
      }
    })
  
  }
  async update (id, data) {
    const ctx = this.ctx
    const updateTime = dayjs().toISOString()
    return await ctx.model.User.update({data,updateTime}, {where:{id}})
  }
  // 创建用户
  async create(obj) {
    const ctx = this.ctx
    // 创建的时候先查询数据库是否已经存在对应的username
    const user = await ctx.model.User.findOne({
      where : {
        username: obj.username
      }
    })
    if(user) {
      return {
        success: false,
        message: '用户名已被注册!'
      }
    }
   
    const id = uuidv1()
    const createTime = dayjs().toISOString()
    const {username, password, isAdmin} = obj
    let auth = isAdmin
    let result = await ctx.model.User.create({id, username, password, auth ,createTime})
    return result.id

  }
  
}
module.exports = User