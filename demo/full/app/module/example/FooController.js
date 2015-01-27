'use strict';

define([], function () {

        return ['$scope', '$location', function ($scope, $location) {
            $scope.text = 'FooController';
            $scope.path = $location.path();
        }];

    });
