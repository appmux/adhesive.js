'use strict';

// Here's our basic application-wide configuration. Keep all your global setings
// here and they will be accessible across the entire application
// via 'config' injectable.
define([], function () {

  return {
    // Some default options
    default: {
      pageTitle: 'Demo',
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
      ngAuth: {
        routes: {
          '/example': {requireAccess: []},
          '/example/bar': {requireAccess: ['basic-r']},
          '/example/foo': {requireAccess: ['denied-crud']},
          '/blog/post': {requireAccess: ['read']}
        }
      }
    }
  };

});
