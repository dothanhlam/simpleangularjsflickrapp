'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
    value('version', '0.1').
    config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = undefined;
    }]).
    factory('Photo', function($resource){return $resource('http://api.flickr.com/services/rest/', {});
});