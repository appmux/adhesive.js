
(function (window, angular, undefined) {
    'use strict';

    var module = angular.module('ngCacheBuster', []);

    module
        .provider('cacheBuster', function () {
            var _paths = [],
                _urlParams = {};

            this.setPaths = function (paths) {
                _paths = paths;
            };

            this.setUrlParams = function (params) {
                _urlParams = params;
            };

            this.$get = function () {
                return {
                    urlParams: _urlParams,
                    paths: _paths
                };
            };
        })
        .config(['$httpProvider', function ($httpProvider) {
            module.$httpProvider = $httpProvider;
        }])
        .run(['cacheBuster', function (cacheBuster) {
            if (cacheBuster.paths.length > 0) {
                module.$httpProvider.interceptors.push(function () {
                    return {
                        'request': function (config) {
                            var bust = false;

                            $.each(cacheBuster.paths, function (k, v) {
                                if (typeof v == 'string') {
                                    if (config.url === v) {
                                        bust = true;
                                        return false;
                                    }
                                } else if (typeof v == 'object' && typeof v.test == 'function') {
                                    if (config.url.match(v)) {
                                        bust = true;
                                        return false;
                                    }
                                }
                            });

                            if (bust) {
                                config.params = angular.extend(config.params || {}, cacheBuster.urlParams);
                            }

                            return config;
                        }
                    };
                });
            }
        }]);

})(window, window.angular);
