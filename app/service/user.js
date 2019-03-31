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
}
module.exports = User