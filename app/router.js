'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // app.resources('users', '/users', app.controller.users);
  router.get('/users/index', controller.users.index)
};
