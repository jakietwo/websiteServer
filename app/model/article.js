'use strict';

module.exports = app => {
    const {STRING ,INTEGER, DATE ,TEXT } = app.Sequelize ;
    const Article = app.model.define('article', {
        id: {
            type: STRING,
            primaryKey: true,     
        },
        title: STRING,
        content: TEXT,
        createTime: DATE,
        updateTime: DATE
    },{
        timestamps: false, // 取消sequelize 自动添加created_at 实属恶心
    })
    return Article ;
}