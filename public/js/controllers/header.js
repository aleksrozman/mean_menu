'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global',
function($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title' : 'Orders',
        'link' : 'orders'
    },{
        'title' : 'Gatherings',
        'link' : 'gatherings'
    },{
        'title' : 'Restaurants',
        'link' : 'restaurants'
    },{
        'title' : 'Users',
        'link' : 'users'
    }];

    $scope.isCollapsed = false;
}]);
