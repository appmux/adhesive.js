'use strict';

// Here's our basic application-wide configuration. Keep all your global setings
// here and they will be accessible across the entire application
// via 'config' injectable.
define([], function () {

    return {
        // Some default options
        default: {
            path: '/',
            moduleNotFound: '/module-not-found'
        },
        // Options for native angular modules to be configured
        // at the config() stage of bootstrap.
        ngModule: {
          
            // Here we'll have ngCacheBuster to use special urlParams
            // when loading files that matched by the regular expression.
            ngCacheBuster: {
                paths: [
                    /view\/[^\.]*\.html/g
                ],
                urlParams: {b: BUILD_NUMBER}
            },
        }
    };

});
