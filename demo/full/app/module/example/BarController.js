'use strict';

define('module/example/BarController', [], function () {

  return ['$scope', '$location', function ($scope, $location) {
    $scope.text = 'BarController';
    $scope.path = $location.path();
  }];

});
