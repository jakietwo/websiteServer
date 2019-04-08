'use strict' ;
module.exports = app => {
    const {STRING, DATE, TEXT } = app.Sequelize ;
    const Categoty = app.model.define('category', {
        id: {
            type: STRING,
            primaryKey: true
        },
        name: STRING,
        articleId: STRING
    },{
        timestamps: false, // 取消sequelize 自动添加created_at 实属恶心
    })
    return Categoty
}