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
        userId: STRING,
        commentcol: STRING
    })
    return Comment

}