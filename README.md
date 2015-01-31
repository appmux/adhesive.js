adhesive.js for AngularJS
=========================

adhesive.js framework for AngularJS delivers essential components for integration of angular with the real world. It brings the AMD concept to angular and allows you to define the project's file structure and to leverage lazy-loading of modules. It also includes a set of other useful modules to build and deliver great single-page applications. Components are independent and can be used individually.

The framework turns the development nightmare into pure pleasure, no more thousand-line source code files, no more struggling with browser cache during development or a production release, none of that nonsense...

It has been test driven in production environments and is proven to work with multiple large-scale mission-critical applications for over 6 months before it was released to the public. It has lived through several AngularJS version upgrades since 1.9.3 and demonstrated scalability, great performance and high reliability.

adhesive.js is created with developers in mind. It's completely open for any kind of customization via different design patterns, starting with simple configuration to implementation of custom strategies.

Follow on: <a href="https://twitter.com/appmux">Twitter</a>

Demo
----
See the live <a href="http://plnkr.co/edit/CcGw4apNYtsLoT33kfAc">demo of adhesive.js</a> to believe.

Components
==========

adhesive.js components are independent, you can mix and match and season to taste.

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
- Build your modules to be application-agnostic, independent and sharable.

<h3>ngCacheBuster</h3>
<p>Cache buster for AngularJS applications.</p>

<h4>Features</h4>
- Automatically reset browser cache for static files used in AngularJS application.
- No-hassle development, see changes immediately on reload, no browser tweaks needed.
- Ensure users receive the latest version of files on application release.
- Keep static files cacheable in production environment between versions.
- No server configuration needed.

<h3>ngTitle</h3>
<p>Allows to set and update the page title from a route, controller and a template.</p>

<h4>Features</h4>
- Set the title via the route configuration.
- Set the title from the controller.
- Set the title from the template using data-page-title element ot attribute, with support for bound variables.

See <a href="http://plnkr.co/edit/OzXVbGIgemABVIbq9Axg">ngTitle demo</a>.

<h3>ngIntercom</h3>
<p>Allows two-way communication via eventing between AngularJS and other JavaScript applications.</p>

<h4>Features</h4>
- Send events to AngularJS application from outside world.
- Send events to outside world from AngularJS application.
