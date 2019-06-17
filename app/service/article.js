'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs');
const uuidv1 = require('uuid/v1');

class Article extends Service {
  async index() {
    const ctx = this.ctx;
    return await ctx.model.Article.findAll();
  }
  async show(id) {
    const ctx = this.ctx;
    return await ctx.model.Article.findByPk(id);
  }
  async update(id, data) {
    const ctx = this.ctx;
    const updateTime = dayjs().toISOString();
    let data1 = Object.assign(data, { updateTime });
    const article = await ctx.model.Article.findByPk(id);
    if (!article) {
      ctx.response.status = 200;
      return {
        success: false,
        msg: '更新失败！没有找到articleId'
      };
    }
    let result = await article.update(data1);
    return Object.assign(
      {
        success: true,
        msg: '更新成功！'
      },
      { data: result }
    );
  }
  async destroy(id) {
    const ctx = this.ctx;
    return await ctx.model.Article.destroy({
      where: {
        id: id
      }
    });
  }
  async create(obj) {
    const ctx = this.ctx;
    // 创建文章的时候不需要查询数据库
    const id = uuidv1();
    const createTime = dayjs().toISOString();
    const { title, content } = obj;
    let result = await ctx.model.Article.create({ id, title, content, createTime });
    return result.id;
  }
}
module.exports = Article;
