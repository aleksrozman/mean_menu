'use strict';

//Service used for articles REST endpoint
angular.module('mean.orders').factory('Orders', ['$resource', function($resource) {
    return $resource('orders/:orderId', {
        orderId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);