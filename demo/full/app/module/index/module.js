'use strict';

define('module/index', [],
  function () {

    var config = {
      name: 'index',
      routes: {
        '/': {templateUrl: 'app/module/index/view/index.html'}
      }
    };

    return {
      config: config
    };
  });
  