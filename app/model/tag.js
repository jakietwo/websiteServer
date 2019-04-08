'use strict' ;
module.exports = app => {

    const {STRING} = app.Sequelize ;
    const Tag = app.model.define('tag', {
        id: {
            type: STRING,
            primaryKey: true
        },
        name: STRING,
        articleId: STRING
    },{
        timestamps: false, // 取消sequelize 自动添加created_at 实属恶心
    })
    return Tag
}