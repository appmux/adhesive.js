'use strict';

define([], function () {

  return ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {

    this.postAction = function () {
      $scope.action = 'Create a post';
    };

    this.adminAction = function () {
      $scope.action = 'Administration';
    };

    if ($routeParams.hasOwnProperty('action') &&
      this.hasOwnProperty($routeParams.action + 'Action') &&
      typeof this[$routeParams.action + 'Action'] == 'function'
    ) {
      this[$routeParams.action + 'Action']();
    }

  }];

});
