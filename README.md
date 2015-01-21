adhesive.js
==========

adhesive.js framework that delivers essential components for integration of AngilarJS with the real world. Define your project file structure and leverage modules you were looking for forever to build and deliver your SPA application. This framework turns the development nightmare into a pure pleasure, no more a 1000 lines source code files, no more struggling with browser cache during development or a production release, non of that nonsense...

The framework is proven to work with multiple large-scale mission-critical applications over 6 months now, lived through several AngularJS version upgrades since 1.9.3 and demonstrated scalability, great performance and high reliability.

adhesive.js created with developers in mind, it's completely open for any kind of customizations via different patterns, starting with simple configuration to implementation of custom strategies.

Demo
====
See the live <a href="http://plnkr.co/edit/CcGw4apNYtsLoT33kfAc">demo of adhesive.js</a> to believe.

Components
==========

adhesive.js components are independent, you can mix and match and add salt to taste.

<h3>ngModular</h3>
<p>Provides modular file structure with auto-loading capabilities for AngularJS applications.</p>

<h4>Features</h4>
- Organize AngularJS applications and modules into a flexible file structure.
- Split modules into separate files, i.e. FooController.js, BarController.js, FooService.js, etc.
- Create independent shareable modules.
- Load modules on the fly, after the applications has been bootstrapped.
- Leverage path-to-module resolution with module auto loading capability.
- Decrease initial load time by loading only modules required to initialize the application, i.e. index module.
- Organize and share generic application level components accessible by all modules, i.e. filters, directives, etc.
- Provide higher security by loading secure modules after authentication.
- Build flexible and scalable applications.
- Easy for development, solid for production.
- Minification ready.

<h4>Dependencies</h4>
- require.js
- ngRoute

<h3>ngConfig</h3>
<p>Application configuration provider for AngularJS applications.</p>

<h4>Features</h4>
- Leverage centralized configuration file for easier maintenance.
- Make your modules flexible via configuration.
- Build your modules application agnostic, independent and sharable.

<h3>ngCacheBuster</h3>
<p>Cache buster for AngularJS applications.</p>

<h4>Features</h4>
- Automatically reset browser cache for static files used in AngularJS application.
- No hassle development, see changes immediately on reload, no browser tweaks needed.
- Ensure users receive the latest version of files on application release.
- Keep static files cacheable in production environment between versions.
- No server configuration needed.
