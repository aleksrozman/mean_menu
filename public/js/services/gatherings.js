'use strict';

//Service used for articles REST endpoint
angular.module('mean.gatherings').factory('Gatherings', ['$resource', function($resource) {
    return $resource('gatherings/:gatheringId', {
        gatheringId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);