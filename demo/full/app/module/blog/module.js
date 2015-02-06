'use strict';

require.config({
  paths: {
    'module/blog/IndexController': 'module/blog/IndexController'
  }
});

define([
    'module/blog/IndexController'
  ],
  function (IndexController) {

    var config = {
      name: 'blog',
      controllers: [
        {name: 'IndexController', delegate: IndexController}
      ],
      routes: {
        '/blog': {templateUrl: 'app/module/blog/view/index.html', controller: 'IndexController', title: 'Blog'},
        '/blog/:action': {templateUrl: 'app/module/blog/view/action.html', controller: 'IndexController'},
        //'/blog': {templateUrl: 'app/module/blog/view/index.html', controller: IndexController, title: 'Blog'},
        '/blog/admin': {
          templateUrl: 'app/module/blog/view/admin.html',
          controller: 'IndexController',
          title: 'Blog Administration',
          requireAccess: ['admin']
        }
      }
    };

    return {
      config: config
    };
  });
