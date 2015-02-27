/**
 * ngTitle: Allows to set and update the page title from a route, controller and a template
 *
 * Features
 * - Set the title via the route configuration.
 * - Set the title from the controller.
 * - Set the title from the template using data-page-title element ot attribute,
 *   with support for bound variables.
 *
 * @license adhesive.js 1.0.4
 * @url https://github.com/appmux/adhesive.js
 * @author Alexander Korzh
 * Copyright (c) 2014 Alexander Korzh
 * License: MIT
 */

(function (window, angular, undefined) {
  'use strict';

  angular.module('ngTitle', ['ngRoute'])
    .provider('pageTitle', function () {
      var _title = [],
        _postfix = '',
        _delimiter = ' - ',
        _watches = [];

      this.setPostfix = function (postfix) {
        _postfix = postfix;
      };

      this.setDelimiter = function (delimiter) {
        _delimiter = delimiter;
      };

      this.$get = $get;
      $get.$inject = ['$rootScope'];
      function $get($rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, next) {
          var watch;

          while (watch = _watches.shift()) {
            if (typeof watch == 'function') {
              watch();
            }
          }

          _title = [];

          if (_postfix != '') {
            _title.push(_postfix);
          }

          if (next && next.title && next.title != '') {
            _title.push(next.title);
          }
        });

        return {
          setTitle: function (value, index) {
            if (typeof index == 'number' && index >= 0 && index < _title.length) {
              _title[index] = value;
            } else {
              _title.push(value);
              index = _title.length - 1;
            }

            return index;
          },

          getTitle: function () {
            return _title;
          },

          renderTitle: function () {
            var comps = [];

            for (var i = 0; i < _title.length; i++) {
              if (typeof _title[i] == 'string' && _title[i] != '') {
                comps.push(_title[i]);
              }
            }

            return comps.reverse().join(_delimiter);
          },

          addWatch: function (watch) {
            _watches.push(watch);
          }
        };
      }
    })
    .directive('title', ['pageTitle', function (pageTitle) {
      return {
        restrict: 'E',
        link: function (scope, element, attrs) {
          scope.$watch(
            function (scope) {
              return pageTitle.renderTitle();
            },
            function (value) {
              element.html(value);
            }
          );
        }
      };
    }])
    .directive('pageTitle', ['pageTitle', function (pageTitle) {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
          var index = pageTitle.setTitle();

          pageTitle.addWatch(scope.$watch(
            function (scope) {
              return element[0].innerText;
            },
            function (value) {
              pageTitle.setTitle(value, index);
            }
          ));
        }
      };
    }]);

})(window, window.angular);
