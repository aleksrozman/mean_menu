'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/restaurants', {
            templateUrl: 'views/restaurants/list.html'
        }).
        when('/restaurants/:restaurantId', {
            templateUrl: 'views/restaurants/view.html'
        }).
        when('/categories/:categoryId', {
            templateUrl: 'views/restaurants/category.html'
        }).
        when('/items/:itemId', {
            templateUrl: 'views/restaurants/item.html'
        }).
        when('/users', {
            templateUrl: 'views/users/list.html'
        }).
        when('/gatherings', {
            templateUrl: 'views/gatherings/list.html'
        }).
        when('/gatherings/:gatheringId', {
            templateUrl: 'views/gatherings/view.html'
        }).
        when('/orders', {
            templateUrl: 'views/orders/list.html'
        }).
        when('/orders/:orderId', {
            templateUrl: 'views/orders/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);