'use strict';

define('module/example/IndexController', [], function () {

  return ['$scope', '$location', function ($scope, $location) {
    $scope.text = 'IndexController';
    $scope.path = $location.path();
  }];

});
