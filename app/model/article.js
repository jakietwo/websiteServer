'use strict';

module.exports = app => {
    const {STRING ,INTEGER, DATE ,TEXT } = app.Sequelize ;
    const Article = app.model.define('artcile', {
        id: {
            type: STRING,
            primaryKey: true,     
        },
        title: STRING,
        content: TEXT,
        createTime: DATE,
        updateTime: DATE
    })
    return Article ;
}