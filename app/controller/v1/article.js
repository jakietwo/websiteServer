'use strict';
const Controller = require('egg').Controller;

class articleController extends Controller {
  // list all article
  async index() {
    const ctx = this.ctx;
    const article = await ctx.service.article.index();
    ctx.response.body = article;
    ctx.status = 200;
  }

  async show() {
    const ctx = this.ctx;
    // 验证是否具有权限
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    // 上节代码
    const { id } = ctx.params;
    const article = await ctx.service.article.show(id);
    ctx.response.body = article;
    ctx.status = 200;
  }

  async create() {
    const ctx = this.ctx;
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    const { title, content } = ctx.request.body;
    if (!title || !content) {
      ctx.response.body = {
        success: false,
        msg: '参数不合法!'
      };
      return;
    }
    const article = await ctx.service.article.create({ title, content });
    ctx.status = 201;
    ctx.body = {
      success: true,
      articleId: article,
      message: '添加文章成功!'
    };
  }

  async update() {
    const ctx = this.ctx;
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    const { id } = ctx.params;
    const data = ctx.request.body;
    const article = await ctx.service.article.update(id, data);
    // 成功返回的数据是[1] 否则是[0]
    if (article.length && article[0]) {
      ctx.response.body = {
        success: true,
        msg: '更新成功!'
      };
      ctx.status = 200;
    } else {
      ctx.response.body = {
        success: false,
        msg: '更新失败'
      };
      ctx.status = 400;
    }
  }

  async destroy() {
    const ctx = this.ctx;
    let MyCheckToken = this.app.middleware.mycheckToken('', this.app);
    let res = await MyCheckToken(ctx);
    if (!res.success) {
      ctx.body = { code: 400, success: false, msg: '验证失败!,请登录!' };
      return;
    }
    const { id } = ctx.params;
    const article = await ctx.service.article.destroy(id);
    // 返回article 成功竟然是1 不成功则是0
    if (article) {
      ctx.response.body = {
        success: true,
        msg: '删除成功!'
      };
      ctx.status = 200;
    } else {
      ctx.response.body = {
        success: false,
        msg: '删除失败'
      };
      ctx.status = 400;
    }
  }
}
module.exports = articleController;
