'use strict';

define([], function () {

  return ['$scope', '$location', function ($scope, $location) {
    $scope.text = 'IndexController';
    $scope.path = $location.path();
  }];

});
