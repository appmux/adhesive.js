'use strict';

define('module/example/FooController', [], function () {

  return ['$scope', '$location', 'pageTitle', function ($scope, $location, pageTitle) {
    $scope.text = 'FooController';
    $scope.path = $location.path();
    pageTitle.setTitle('Foo');
  }];

});
