
(function(window, angular, undefined) {'use strict';

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
