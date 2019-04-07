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
    })
    return Tag
}