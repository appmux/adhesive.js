'use strict';

require.config({
  paths: {
    'module/example/IndexController': 'module/example/IndexController',
    'module/example/FooController': 'module/example/FooController',
    'module/example/BarController': 'module/example/BarController'
  }
});

define('module/example', [
    'module/example/IndexController',
    'module/example/FooController',
    'module/example/BarController'
  ],
  function (IndexController, FooController, BarController) {

    var config = {
      name: 'example',
      controllers: [
        {name: 'IndexController', delegate: IndexController},
        {name: 'FooController', delegate: FooController},
        {name: 'BarController', delegate: BarController}
      ],
      routes: {
        '/test': {templateUrl: 'app/module/example/view/example.html', controller: 'IndexController'},
        '/example': {templateUrl: 'app/module/example/view/example.html', controller: 'IndexController'},
        '/example/foo': {templateUrl: 'app/module/example/view/example.html', controller: 'FooController'},
        '/example/bar': {
          templateUrl: 'app/module/example/view/example.html',
          controller: 'BarController',
          title: 'Bar',
          requireAccess: ['beer-crud', 'wine-r']
        }
      }
    };

    return {
      config: config
    };
  });
