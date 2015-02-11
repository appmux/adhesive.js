/**
 * ngConfig: Application configuration provider for AngularJS applications
 *
 * Features
 * - Leverage centralized configuration file for easier maintenance.
 * - Make your modules flexible via configuration.
 * - Build your modules application agnostic, independent and sharable.
 *
 * @license adhesive.js 1.0.4
 * @url https://github.com/appmux/adhesive.js
 * @author Alexander Korzh
 * Copyright (c) 2014 Alexander Korzh
 * License: MIT
 */

(function (window, angular, undefined) {
  'use strict';

  angular.module('ngConfig', [])
    .provider('config', function () {
      var config = {};

      this.configure = function (configuration) {
        config = configuration;
      };

      this.$get = function () {
        return config;
      };
    });

})(window, window.angular);
