'use strict' ;
module.exports = app => {
    const {STRING , TEXT ,DATE} = app.Sequelize ;
    const Comment = app.model.define('comment', {
        id: {
            type: STRING,
            primaryKey: true
        },
        articleId: STRING,
        content: TEXT,
        createTime: DATE,
        updateTime: DATE,
        userId: STRING
    },{
        timestamps: false, // 取消sequelize 自动添加created_at 实属恶心
    })
    return Comment

}