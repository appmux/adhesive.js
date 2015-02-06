'use strict';

define([], function () {

  return ['$scope', '$location', 'pageTitle', function ($scope, $location, pageTitle) {
    $scope.text = 'FooController';
    $scope.path = $location.path();
    pageTitle.setTitle('Foo');
  }];

});
