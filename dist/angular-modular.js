/**
 * ngModular: Provides modular file structure with auto-loading capabilities for AngularJS applications
 *
 * Features
 * - Organize AngularJS applications and modules into a flexible file structure.
 * - Split modules into separate files, i.e. FooController.js, BarController.js, FooService.js, etc.
 * - Create independent shareable modules.
 * - Load modules on the fly, after the applications has been bootstrapped.
 * - Leverage path-to-module resolution with module auto loading capability.
 * - Decrease initial load time by loading only modules required to initialize the application, i.e. index module.
 * - Organize and share generic application level components accessible by all modules, i.e. filters, directives, etc.
 * - Provide higher security by loading secure modules after authentication.
 * - Build flexible and scalable applications.
 * - Easy for development, solid for production.
 * - Minification ready.
 *
 * Dependencies
 * - require.js
 * - ngRoute
 *
 * @license adhesive.js 1.0.4
 * @url https://github.com/appmux/adhesive.js
 * @author Alexander Korzh
 * Copyright (c) 2014 Alexander Korzh
 * License: MIT
 */

(function (window, require, angular, undefined) {
  'use strict';

  var modular = angular.module('ngModular', ['ngRoute']);

  modular.config(['$routeProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
      modular.routeProvider = $routeProvider;
      modular.controller = $controllerProvider.register;
      modular.service = $provide.service;
      modular.factory = $provide.factory;
      modular.value = $provide.value;
      modular.directive = $compileProvider.directive;
      modular.filter = $filterProvider.register;
    }]);

  modular.provider('autoLoader', function () {
    var strategies = [
      {
        name: 'default',
        resolve: ['$location', function ($location) {
          var moduleName = $location.path().split("/")[1];

          if (moduleName) {
            moduleName = 'module/' + moduleName;

            if (requirejs.s.contexts._.config.paths.hasOwnProperty(moduleName)) {
              return moduleName;
            }
          }
        }]
      }
    ];

    this.addStrategy = function (strategy) {
      strategies.push(strategy);
      return this;
    };

    this.$get = function () {
      return {
        strategies: strategies,
        resolve: {
          resolve: {
            autoLoader: ['$q', '$rootScope', 'autoLoader', 'moduleLoader',
              function ($q, $rootScope, autoLoader, moduleLoader) {
                var moduleName;

                for (var i = 0; i < autoLoader.strategies.length; i++) {
                  if (!!(moduleName = angular.element(document).injector().invoke(autoLoader.strategies[i].resolve))) {
                    break;
                  }
                }

                if (!moduleName) {
                  $rootScope.$broadcast('ngModular.notFound', {name: moduleName});
                  return;
                }

                var deferred = $q.defer();

                require(
                  [moduleName],
                  function onLoad(module) {
                    moduleLoader.init(module);
                    deferred.reject();
                    $rootScope.$broadcast('ngModular.loaded', {name: moduleName});
                  }, function onError(e) {
                    deferred.reject();
                    $rootScope.$broadcast('ngModular.notFound', {name: moduleName});
                  });

                return deferred.promise;
              }]
          }
        }
      };
    };
  });

  modular.provider('moduleLoader', function () {
    this.$get = function () {

      var isDelegate = function (obj) {
        return typeof obj == 'object' &&
          obj.hasOwnProperty('name') &&
          obj.hasOwnProperty('delegate');
      };

      var normalizeConfig = function (config) {
        var properties = ['directives', 'factories', 'filters', 'listeners', 'providers', 'services'],
          property;

        while (property = properties.shift()) {
          if (config.hasOwnProperty(property)) {
            var normalized = [];

            if (isDelegate(config[property])) {
              normalized.push(config[property]);
            } else if (Array.isArray(config[property])) {
              continue;
            } else if (typeof config[property] == 'object' && config[property].hasOwnProperty('length')) {
              for (var i = 0; i < config[property].length; i++) {
                if (Array.isArray(config[property][i])) {
                  normalized = normalized.concat(config[property][i]);
                } else if (isDelegate(config[property][i])) {
                  normalized.push(config[property][i]);
                }
              }
            }

            if (normalized.length > 0) {
              config[property] = normalized;
            }
          }
        }
      };

      return {
        init: function (module) {
          var errPrefix = 'Module initialization failed. ';

          if (typeof module.config !== 'object') {
            throw new Error(errPrefix + 'Module configuration is not defined.');
          }

          if (typeof module.config.name !== 'string') {
            throw new Error(errPrefix + 'Module name is not defiled.')
          }

          var injector = angular.element(document).injector();
          var config = module.config;
          var controllerNamePrefix = config.name + '.';

          normalizeConfig(config);

          if (config.config) {
            config.mod[config.name] = config.config;
          }

          if (config.values) {
            angular.forEach(config.values, function (value, provider) {
              modular.value(provider, value);
            });
          }

          if (config.constants) {
            injector.invoke(['$rootScope', function ($rootScope) {
              angular.forEach(config.constants, function (v, k) {
                $rootScope[k] = v;
              });
            }]);
          }

          if (config.controllers) {
            angular.forEach(config.controllers, function (v, k) {
              modular.controller(controllerNamePrefix + v.name, v.delegate);
            });
          }

          if (config.routes) {
            injector.invoke(['$rootScope', function ($rootScope) {
              angular.forEach(config.routes, function (options, route) {
                $rootScope.$broadcast('ngModular.routePreProcess', route, options);

                if (options.controller) {
                  options.controller = controllerNamePrefix + options.controller;
                }

                modular.routeProvider.when(route, options);
              });
            }]);
          }

          if (config.services) {
            angular.forEach(config.services, function (v, k) {
              modular.service(v.name, v.delegate);
            });
          }

          if (config.directives) {
            angular.forEach(config.directives, function (v, k) {
              modular.directive(v.name, v.delegate);
            });
          }

          if (config.filters) {
            angular.forEach(config.filters, function (v, k) {
              modular.filter(v.name, v.delegate);
            });
          }

          if (config.factories) {
            angular.forEach(config.factories, function (v, k) {
              modular.factory(v.name, v.delegate);
            });
          }

          if (config.listeners) {
            injector.invoke(['$rootScope', function ($rootScope) {
              angular.forEach(config.listeners, function (v, k) {
                $rootScope.$on(v.name, v.delegate);
              });
            }]);
          }

          if (module.init) {
            injector.invoke(module.init);
          }
        }
      }
    };
  });

  modular.bootstrap = function (element, dependencies, modules) {
    angular.bootstrap(element, dependencies);

    angular.element(document).injector().invoke(['$rootScope', '$route', 'autoLoader', 'moduleLoader',
      function ($rootScope, $route, autoLoader, moduleLoader) {
        angular.forEach(modules || [], function (module, i) {
          moduleLoader.init(module);
        });

        modular.routeProvider.otherwise(autoLoader.resolve);

        $rootScope.$on('ngModular.loaded', function (event, module) {
          $route.reload();
        });

        $rootScope.$broadcast('ngModular.loaded');
      }]);
  };

})(window, window.require, window.angular);
