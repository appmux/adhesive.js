/**
 * ngIntercom: Allows two-way communication via eventing between AngularJS and other JavaScript applications
 *
 * Features
 * - Send events to AngularJS application from outside world.
 * - Send events to outside world from AngularJS application.
 *
 * @license adhesive.js 1.0.4
 * @url https://github.com/appmux/adhesive.js
 * @author Alexander Korzh
 * Copyright (c) 2014 Alexander Korzh
 * License: MIT
 */

(function (window, document, angular, undefined) {
  'use strict';

  angular.module('ngIntercom', [])
    .run(['$rootScope', function ($rootScope) {
      document.addEventListener('ngIntercom.callIn', function (e) {
        $rootScope.$emit('ngIntercom.callIn', e);
      });

      $rootScope.$on('ngIntercom.callOut', function (e, data) {
        var callOut = new CustomEvent('ngIntercom.callOut', {detail: data});
        document.dispatchEvent(callOut);
      });
    }]);

})(window, document, window.angular);
