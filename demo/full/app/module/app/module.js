'use strict';

// Here we tap into ngModular realm. The main thing to understand is all
// we do here is wrapping native angular functinoality into a form of AMD modules.
define([],
  function () {

    var config = {

      // Any module has to have a name
      name: 'app',

      // Let's set some constants, they will become available
      // via the $rootScope after the module is loaded.
      constants: {
        BUILD_NUMBER: BUILD_NUMBER
      },

      // Let's add some app-wide routes
      routes: {

        // If a module cannot be auto-loaded, display this defult page.
        '/module-not-found': {templateUrl: 'app/module/app/view/module-not-found.html'},
      }
    };

    // When we done with configuration, we return it as an object
    // understandable by ngModular, so it can load your module
    // into the memory and make it available in the application.
    //
    // As mentioned earlier, the main application module serves
    // as an umbrella for all the common app-level functionality.
    return {
      config: config,

      // Init function is used when you want to run some code right after
      // the module is laoded.
      init: function ($rootScope, $location, config) {
        console.log('module/app loaded.');

        // For example, we set a hndler for 'moduleNotFound' event that
        // simply forwards to the module not found page.
        $rootScope.$on('moduleNotFound', function (event, module) {
          $location.path(config.default.moduleNotFound);
        });
      }
    };
  });
  