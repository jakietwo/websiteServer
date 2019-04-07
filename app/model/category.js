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
    })
    return Categoty
}