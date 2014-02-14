'use strict';

//Service used for articles REST endpoint
angular.module('mean.restaurants').factory('Restaurants', ['$resource', function($resource) {
    return $resource('restaurants/:restaurantId', {
        restaurantId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);