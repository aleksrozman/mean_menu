'use strict';

angular.module('mean.orders').controller('OrdersController', ['$scope', '$routeParams', '$location', 'Global', 'Orders', 'Gatherings',
function($scope, $routeParams, $location, Global, Orders, Gatherings) {
    $scope.global = Global;
    $scope.sumTotal = 0;

    $scope.loadRestaurant = function(restaurant) {
        Orders.query({
            gathering: $scope.gathering._id,
            restaurant: (restaurant.name === 'All') ? 0 : restaurant._id
        }, function(orders) {
            $scope.orders = orders;
        });
    };

    $scope.load = function() {
        Gatherings.query(function(gatherings){
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
	
	$scope.loadDefaultRestaurant = function(gathering) {
		if(gathering.restaurants.length === 1) {
			$scope.restaurant = gathering.restaurants[0];
			$scope.loadRestaurant($scope.restaurant);
		}
	};

    $scope.remove = function(order) {
        if (order) {
            order.$remove();

            for (var i in $scope.orders) {
                if ($scope.orders[i] === order) {
                    $scope.orders.splice(i, 1);
                }
            }
        } else {
            $scope.order.$remove();
            $location.path('orders');
        }
    };

    $scope.total = function() {
        var total = 0;
        if(!$scope.orders) {
            return 0;
        }
        for (var i = 0; i < $scope.orders.length; i++) {
            for (var j = 0; j < $scope.orders[i].items.length; j++) {
                var item = $scope.orders[i].items[j];
                total = total + item.item.price[item.price_index].value * item.quantity;
            }
        }
        return total;
    };

    $scope.findOne = function() {
        Orders.get({
            orderId : $routeParams.orderId
        }, function(order) {
            $scope.order = order;
        });
    };
}]);