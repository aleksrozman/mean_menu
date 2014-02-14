'use strict';

angular.module('mean.gatherings').controller('GatheringsController', ['$scope', '$routeParams', '$location', 'Global', 'Gatherings', 'Users', 'Restaurants',
function($scope, $routeParams, $location, Global, Gatherings, Users, Restaurants) {
    $scope.global = Global;

    $scope.dateOptions = {
        'year-format': '\'yy\'',
        'starting-day': 1
    };

    function spliceElement(array, element) {
        for (var i in array) {
            if (array[i] === element) {
                array.splice(i, 1);
            }
        }
    }

    $scope.format = 'dd-MMMM-yyyy';
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        
        $scope.opened = true;
    };
    
    $scope.remove = function(gathering) {
        if (gathering) {
            gathering.$remove();
            spliceElement($scope.gatherings, gathering);
        } else {
            $scope.gathering.$remove();
            $location.path('gatherings');
        }
    };

    $scope.find = function() {
        Gatherings.query(function(gatherings) {
            $scope.gatherings = gatherings;
        });
    };

    $scope.findOne = function() {
        Gatherings.get({
            gatheringId : $routeParams.gatheringId
        }, function(gathering) {
            $scope.gathering = gathering;
        });
        Users.query(function(users) {
            $scope.users = users;
        });
        Restaurants.query(function(restaurants) {
            $scope.restaurants = restaurants;
        });
    };

    $scope.create = function() {
        var gathering = new Gatherings();
        gathering.$save(function(response) {
            $scope.gathering = response;
            $location.path('gatherings/' + response._id);
        });
    };
    
    $scope.update = function() {
        $scope.gathering.$update(function() {
            $location.path('gatherings');
        });
    };

    $scope.addUser = function(user) {
        if(!$scope.gathering.users) {
            $scope.gathering.users = [];
        }
        $scope.gathering.users.push(user);
        spliceElement($scope.users, user);
        $scope.user = null;
    };

    $scope.addRestaurant = function(restaurant) {
        if(!$scope.gathering.restaurants) {
            $scope.gathering.restaurants = [];
        }
        $scope.gathering.restaurants.push(restaurant);
        spliceElement($scope.restaurants, restaurant);
        $scope.restaurant = null;
    };

    $scope.removeUser = function(user) {
        spliceElement($scope.gathering.users, user);
        $scope.users.push(user);
    };

    $scope.removeRestaurant = function(restaurant) {
        spliceElement($scope.gathering.restaurants, restaurant);
        $scope.restaurants.push(restaurant);
    };

}]);