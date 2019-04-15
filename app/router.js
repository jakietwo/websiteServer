'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/v1/users/login', controller.v1.login.login)
  router.post('/api/v1/users/sign', controller.v1.users.create)
  // app.resources('users', '/users', app.controller.users);
  app.router.resources('users', '/api/v1/users', app.controller.v1.users)
  app.router.resources('article', '/api/v1/articles', app.controller.v1.article)
  app.router.resources('comment', '/api/v1/comments', app.controller.v1.comment)
  app.router.resources('reply', '/api/v1/replys', app.controller.v1.reply)
  app.router.resources('tag', '/api/v1/tags', app.controller.v1.tag)
  app.router.resources('category', '/api/v1/categorys', app.controller.v1.category)
  router.post('/api/v1/getCommentsByArtId', controller.v1.comment.getById)
  router.post('/api/v1/getCommentsByUid', controller.v1.comment.getByUserId)

  router.post('/api/v1/getReplyByUserId', controller.v1.reply.getByUserId)
};
