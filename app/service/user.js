'use strict';

const Service = require('egg').Service;

class User extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('users', {id: 1})
    return {user}
  }
  async list () {
    const ctx = this.ctx
    console.log('model',ctx.model)
    return ctx.model.User.findAll()
  }
  async show (id) {
    const ctx = this.ctx
    return ctx.model.User.findOne(id)
  }
  async destory(id) {
    const ctx = this.ctx
    return ctx.model.User.delete(id)
  }
  
}
module.exports = User