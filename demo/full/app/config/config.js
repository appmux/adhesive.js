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

      // A list of protected routes, ngAuth will use them to make sure a user
      // is logged in and has required permissions.

      // ngAuth will also prevent module auto-loading for not authorized users.
      ngAuth: {
        routes: {
          '/example/bar': {requireAccess: []}, // No particular permissions required, just needs to be logged in
          '/example/foo': {requireAccess: ['foo']},
          '/blog/post': {requireAccess: ['create']}
        }
      }
    }
  };

});
