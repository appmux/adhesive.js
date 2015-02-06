'use strict';

define([], function () {

  return ['$scope', '$location', function ($scope, $location) {
    $scope.text = 'BarController';
    $scope.path = $location.path();
  }];

});
