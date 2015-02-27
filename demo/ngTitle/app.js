var app = angular.module('plunker', ['ngTitle'])
  .config(['$routeProvider', 'pageTitleProvider', function ($routeProvider, pageTitleProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'tpl.html',
        title: 'Route Title',
        controller: ['pageTitle', function (pageTitle) {
          pageTitle.setTitle('Controller Title');
      }]});
    
    pageTitleProvider.setPostfix('Demo');
    pageTitleProvider.setDelimiter(' | ');
  }]);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'ngTitle';
});
