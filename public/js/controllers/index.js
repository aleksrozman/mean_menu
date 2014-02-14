'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$location', 'Items', 'RemainingUsers', 'Orders', 'Global', 'Gatherings',
function($scope, $location, Items, Users, Orders, Global, Gatherings) {
    $scope.global = Global;
    
    $scope.loadRestaurant = function(restaurant) {
        console.log(restaurant);
        $scope.allitems = null;
        Items.query({
            restaurant: (restaurant.name === 'All') ? 0 : restaurant._id
        }, function(items) {
            $scope.allitems = items;
        });
        Users.get({
            gatheringId: $scope.gathering._id
        }, function(users) {
            $scope.users = users.all.filter(function(user) {
                for(var order = 0; order < users.ordered.length; order++) {
                    if(users.ordered[order]._id === user._id) {
                        return false;
                    }
                }
                return true;
            });
        });
    };

    $scope.load = function() {
        Gatherings.query({active: true}, function(gatherings){
            $scope.gatherings = gatherings;
            if(gatherings.length === 1) {
                $scope.gathering = gatherings[0];
                if($scope.gathering.restaurants.length === 1) {
                    $scope.restaurant = $scope.gathering.restaurants[0];
                    $scope.loadRestaurant($scope.restaurant);
                }
            }
        });
    };
    
    $scope.total = function() {
        var total = 0;
        if(!$scope.allitems) {
            return 0;
        }
        for(var category = 0; category < $scope.allitems.length; category++) {
            for(var j = 0; j < $scope.allitems[category].items.length; j++) {
                var item = $scope.allitems[category].items[j];
                if(item.quantity) {
                    total = total + item.price[item.price_index].value * item.quantity;
                }
            }
        }
        return total;
    };
    
    $scope.somethingOrdered = function() {
        if($scope.allitems) {
            for(var category = 0; category < $scope.allitems.length; category++) {
                for(var j = 0; j < $scope.allitems[category].items.length; j++) {
                    var item = $scope.allitems[category].items[j];
                    if(item.quantity) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    
    $scope.submit = function(username) {
        if(!username) {
            alert('Did not recognize your name!');
            return;
        }
        var order = new Orders({
            user: username._id,
            gathering: $scope.gathering._id,
            placed: [],
            items: []
        });
        order.placed.push(new Date().getTime());
        for(var category = 0; category < $scope.allitems.length; category++) {
            for(var j = 0; j < $scope.allitems[category].items.length; j++) {
                var item = $scope.allitems[category].items[j];
                if(item.quantity) {
                    order.items.push({'item' : item._id, 'quantity': item.quantity, 'modifications': item.modifications, 'price_index': item.price_index});
                }
            }
        }
        order.$save(function(response) {
            $location.path('orders/' + response._id);
        });
    };
}]);