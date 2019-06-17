'use strict';

const Service = require('egg').Service;
const dayjs  = require('dayjs')
const uuidv1 = require('uuid/v1')

class Category extends Service {
    async index() {
        const ctx = this.ctx
        return await ctx.model.Category.findAll()
    }
    // id是articleId
    async show(id) {
        const ctx = this.ctx
        return await ctx.model.Category.findAll({
            where: {
                articleId: id
            }
        })
    }
    async update(id, data) {
        const ctx = this.ctx
        return await ctx.model.Category.update(data, {
            where: {
                id
            }
        })
    }
    async destroy(id) {
        const ctx = this.ctx
        return await ctx.model.Category.destroy({
            where: {
                id
            }
        })
    }
    async create(obj){
        const ctx = this.ctx
        const {name, articleId} = obj
        // 先判断articleId 是否存在
        const article = await ctx.model.Article.findByPk(articleId)
        if(!article){
            return {
                success: false,
                msg: 'articleId不存在'
            }
        }
        const id = uuidv1()
        const category = await ctx.model.Category.create({ name,id, articleId})
        console.log('category====' ,category)
        return category.id
    }
}
module.exports = Category