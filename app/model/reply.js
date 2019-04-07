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
    })
    return Reply
}