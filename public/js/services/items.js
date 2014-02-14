'use strict';

//Service used for articles REST endpoint
angular.module('mean.items').factory('Items', ['$resource', function($resource) {
    return $resource('items/:itemId', {
        itemId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
angular.module('mean.items').factory('Categories', ['$resource', function($resource) {
    return $resource('categories/:categoryId', {
        categoryId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
