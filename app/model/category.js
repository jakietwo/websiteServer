'use strict' ;
module.exports = app => {
    const {STRING, DATE, TEXT } = app.Sequelize ;
    const Categoty = app.model.define('categorys', {
        id: {
            type: STRING,
            primaryKey: true
        },
        name: STRING,
        articleId: STRING
    },{
        timestamps: false, // 取消sequelize 自动添加created_at 实属恶心
        freezeTableName: true, // 禁止sequelize 自动给table增加复数
    })
    return Categoty
}