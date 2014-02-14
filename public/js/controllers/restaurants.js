'use strict';

angular.module('mean.restaurants').controller('RestaurantsController', ['$scope', '$routeParams', '$location', 'Global', 'Restaurants', 'Items', 'Categories',
function($scope, $routeParams, $location, Global, Restaurants, Items, Categories) {
    $scope.global = Global;
    $scope.types = ['0_Appetizer', '1_Entree', '2_Main', '3_Side', '4_Dessert'];

    $scope.find = function() {
        Restaurants.query(function(restaurants) {
            $scope.restaurants = restaurants;
        });
    };
    
    $scope.findOne = function() {
        Items.query({
            restaurant: $routeParams.restaurantId
        }, function(items) {
            $scope.allitems = items;
        });
    };

    $scope.findItem = function() {
        Items.get({
            itemId: $routeParams.itemId
        }, function(item) {
            $scope.item = item;
        });
    };

    $scope.findCategory = function() {
        Categories.get({
            categoryId: $routeParams.categoryId
        }, function(category) {
            $scope.category = category;
        });
    };
    
    $scope.removeCategory = function(category) {
        Categories.remove({
            categoryId: category._id
        },function() {
            window.location.reload();
        });
    };
    
    $scope.removeItem = function(item) {
        Items.remove({
            itemId: item._id
        },function() {
            window.location.reload();
        });
    };
    
    $scope.add = function() {
        $scope.newrestaurant = new Restaurants();
    };

    $scope.remove = function(restaurant) {
        restaurant.$remove(function(){
            window.location.reload();
        });
    };

    $scope.update = function(restaurant) {
        restaurant.$update(function(){
            window.location.reload();
        });
    };

    $scope.updateCategory = function() {
        $scope.category.$update(function(){
            window.history.back();
        });
    };

    $scope.updateItem = function() {
        $scope.item.$update(function(){
            window.history.back();
        });
    };

    $scope.create = function() {
        $scope.newrestaurant.$save(function() {
            window.location.reload();
        });
    };
    
    $scope.createCategory = function() {
        var category = new Categories({
            restaurant: $routeParams.restaurantId,
            name: 'New Category'
        });
        category.$save(function(response) {
            $location.path('categories/' + response._id);
        });
    };

    $scope.createItem = function(category) {
        var item = new Items({
            name: 'New Item'
        });
        item.$save(function(response) {
            Categories.get({
                categoryId: category._id,
            }, function(category) {
                category.items.push(response);
                category.$update(function(){
                    $location.path('items/' + response._id);
                });
            });
        });
    };

}]);