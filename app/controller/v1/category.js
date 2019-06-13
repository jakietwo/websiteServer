'use strict';
const Controller = require('egg').Controller;

class categoryController extends Controller {
  async index() {
    const ctx = this.ctx;
    const category = await ctx.service.category.index();
    ctx.response.body = category;
    ctx.status = 200;
  }
  // 根据articleId 来找对应的category
  async show() {
    const ctx = this.ctx;
    // // 验证是否具有权限
    // let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    // let res = await MyCheckToken(ctx);
    // if (!res.success) {
    //   ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
    //   return;
    // }
    // // END
    const { id } = ctx.params;
    const category = await ctx.service.category.show(id);
    ctx.response.body = category;
    ctx.status = 200;
  }

  async create() {
    const ctx = this.ctx;
    // 验证是否具有权限
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    // END
    const { name, articleId } = ctx.request.body;
    if (!name || !articleId) {
      ctx.response.body = {
        success: false,
        msg: '参数不合法!'
      };
      ctx.status = 400;
      return;
    }
    const categoty = await ctx.service.category.create({ name, articleId });
    ctx.body = {
      success: true,
      categotyId: categoty,
      msg: '添加分类成功!'
    };
    ctx.status = 201;
  }

  async update() {
    const ctx = this.ctx;
    // 验证是否具有权限
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    // END
    const { id } = ctx.params;
    const data = ctx.request.body;
    const category = await ctx.service.category.update(id, data);
    if (Array.isArray(category) && category[0]) {
      ctx.response.body = {
        success: true,
        msg: '更新成功!'
      };
      ctx.status = 200;
    } else {
      ctx.response.body = {
        success: false,
        msg: '更新失败!'
      };
      ctx.status = 400;
    }
  }

  async destroy() {
    const ctx = this.ctx;
    // 验证是否具有权限
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    // END
    const { id } = ctx.params;
    const category = await ctx.service.category.destroy(id);
    // 返回成功为1 否则为0
    if (category) {
      ctx.response.body = {
        success: true,
        msg: '删除成功!'
      };
      ctx.status = 200;
    } else {
      ctx.response.body = {
        success: false,
        msg: '删除失败!'
      };
      ctx.status = 400;
    }
  }
}

module.exports = categoryController;
