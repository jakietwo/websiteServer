'use strict';

const Service = require('egg').Service;
const dayjs  = require('dayjs')
const uuidv1 = require('uuid/v1')

class Tag extends Service {

    async index() {
        const ctx = this.ctx
        return await ctx.model.Tag.findAll()
    }
    async show(id) {
        const ctx = this.ctx
        return await ctx.model.Tag.findAll({
            where: {
                articleId: id
            }
        })
    }
    async update(id, data) {
        const ctx = this.ctx 
        return await ctx.model.Tag.update(data, {
            where: {
                id
            }
        })
    }
    async destroy(id) {
        const ctx = this.ctx
        return await ctx.model.Tag.destroy({
            where: {
                id
            }
        })
    }
    async create(obj){
        const ctx = this.ctx
        const {name, articleId} = obj
        // 先判断后台是否存在ArticleId
        const article = await ctx.model.Article.findByPk(articleId)
        if(!article){
            return {
                success: false,
                msg: 'articleId不存在'
            }
        }
        const id = uuidv1()
        const tag = await ctx.model.Tag.create({id,name, articleId})
        return tag.id
    }
}
module.exports = Tag