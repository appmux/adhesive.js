/**
 * ngAuth: Provides the core of the authentication mechanism for AngularJS applications
 *
 * Features
 * - Overridable default templates and controllers.
 * - Extendable via implementation of a custom authServiceAdapter.
 * - Reach set of events.
 * - Flexible for development.
 * - Provides ability to build secure applications.
 *
 * @license adhesive.js 1.0.5
 * @url https://github.com/appmux/adhesive.js
 * @author Alexander Korzh
 * Copyright (c) 2014 Alexander Korzh
 * License: MIT
 */

(function (window, angular, undefined) {
  'use strict';

  var module = angular.module('ngAuth', ['template/auth/login.html', 'template/auth/access-denied.html']);

  module.provider('authService', function () {
    var _routes = {
        '/login': {templateUrl: 'template/auth/login.html', controller: 'loginController'},
        '/logout': {template: '', controller: 'logoutController'},
        '/access-denied': {templateUrl: 'template/auth/access-denied.html'}
      },
      _requestedUri;

    var _strategies = [
      {
        name: 'protectedModules',
        getRequiredAccess: ['$location', '$route', function ($location, $route) {
          var path = $location.path(),
            requireAccess;

          if ($route.routes.hasOwnProperty(path) && !$route.routes[path].hasOwnProperty('redirectTo') &&
            $route.routes[path].hasOwnProperty('requireAccess')
          ) {
            requireAccess = $route.routes[path].requireAccess;
          }

          return requireAccess;
        }]
      }
    ];

    this.addStrategy = function (strategy) {
      _strategies.push(strategy);
      return this;
    };

    this.setAdapter = function (adapter) {
      module.service('authServiceAdapter', adapter);
      return this;
    };

    this.getRoutes = function () {
      return _routes;
    };

    this.setRoutes = function (routes) {
      _routes = routes;
      return this;
    };

    this.$get = $get;
    $get.$inject = ['$rootScope', '$q', 'authServiceAdapter'];
    function $get($rootScope, $q, authServiceAdapter) {

      return {
        logIn: function (credentials) {
          $q.when(authServiceAdapter.logIn(credentials))
            .then(function (result) {
              $rootScope.$broadcast('ngAuth.loggedIn', result);
            });
        },

        logOut: function () {
          $q.when(authServiceAdapter.logOut())
            .then(function (result) {
              $rootScope.$broadcast('ngAuth.loggedOut', result);
            });
        },

        isLoggedIn: function () {
          return !!authServiceAdapter.isLoggedIn();
        },

        hasAccess: function (requireAccess) {
          return authServiceAdapter.hasAccess(requireAccess);
        },

        setRequestedUri: function (path, search) {
          _requestedUri = {path: path, search: search};
        },

        getRequestedUri: function () {
          return _requestedUri;
        },

        getStrategies: function () {
          return _strategies;
        }
      };

    }
  })
    .config(['$routeProvider', '$provide', 'authServiceProvider', function ($routeProvider, $provide, authServiceProvider) {
      module.$routeProvider = $routeProvider;
      module.service = $provide.service;
      module.authServiceProvider = authServiceProvider;
    }])
    .run(['$injector', '$rootScope', '$location', 'authService', function ($injector, $rootScope, $location, authService) {
      angular.forEach(module.authServiceProvider.getRoutes(), function (options, route) {
        module.$routeProvider.when(route, options);
      });

      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        var strategies = authService.getStrategies(),
          requireAccess;

        for (var i = 0; i < strategies.length; i++) {
          if (!!(requireAccess = $injector.invoke(strategies[i].getRequiredAccess))) {
            break;
          }
        }

        if (!requireAccess) {
          return;
        }

        if (!authService.isLoggedIn()) {
          authService.setRequestedUri($location.path(), $location.search());

          next.resolve = null;
          next.redirectTo = '/login';
        } else if (!authService.hasAccess(requireAccess)) {
          next.redirectTo = '/access-denied';
        }
      });
    }])
    .controller('loginController', ['$scope', 'authService', function ($scope, authService) {
      $scope.credentials = {};

      $scope.login = function (credentials) {
        authService.logIn(credentials);
      };
    }])
    .controller('logoutController', ['authService', function (authService) {
      authService.logOut();
    }])
    .directive('requireAccess', ['authService', function (authService) {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          if (!authService.hasAccess(attrs.requireAccess)) {
            element.remove();
          }
        }
      };
    }]);

  angular.module('template/auth/login.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/auth/login.html',
      '<form data-ng-submit="login(credentials)">' +
      '    <input type="text" placeholder="Username" data-ng-model="credentials.username">' +
      '    <input type="password" placeholder="Password" data-ng-model="credentials.password">' +
      '    <button type="submit">Log In</button>' +
      '</form>' +
      '');
  }]);

  angular.module('template/auth/access-denied.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/auth/access-denied.html',
      '<p>This section requires elevated privileges. Please contact the administrator.</p>' +
      '');
  }]);

})(window, window.angular);
