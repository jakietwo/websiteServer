'use strict' ;
module.exports = app => {
    const {STRING , TEXT , DATE} = app.Sequelize ;
    const Reply = app.model.define('reply', {
        id: {
            type: STRING,
            primaryKey: true
        },
        content: TEXT,
        createTime: DATE,
        updateTime: DATE,
        commentId: STRING,
        articled: STRING,
        userId: STRING
    },{
        timestamps: false, // 取消sequelize 自动添加created_at 实属恶心
    })
    return Reply
}