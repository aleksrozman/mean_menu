'use strict';

//Service used for articles REST endpoint
angular.module('mean.users').factory('Users', ['$resource', function($resource) {
    return $resource('users/:userId', {
        userId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.users').factory('RemainingUsers', ['$resource', function($resource) {
    return $resource('users/remaining/:gatheringId', {
        gatheringId: '@_id'
    });
}]);