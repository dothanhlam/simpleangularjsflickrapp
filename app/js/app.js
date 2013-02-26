'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/photolist', {templateUrl: 'partials/photolist.html', controller: PhotoListController});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: AboutController});
    $routeProvider.when('/nophoto', {templateUrl: 'partials/nophoto.html'});
    $routeProvider.otherwise({redirectTo: '/photolist'});
  }]);
