'use strict';

angular.module('mean.users').controller('UsersController', ['$scope', '$routeParams', '$location', 'Global', 'Users',
function($scope, $routeParams, $location, Global, Users) {
    $scope.global = Global;

    $scope.find = function() {
        Users.query(function(users) {
            $scope.users = users;
        });
    };
    
    $scope.add = function() {
        $scope.newuser = new Users();
    };

    $scope.remove = function(user) {
        user.$remove(function(){
            window.location.reload();
        });
    };

    $scope.update = function(user) {
        user.$update(function(){
            window.location.reload();
        });
    };

    $scope.autofill = function() {
        var user = $scope.newuser;
        if(user.name) {
            var name = user.name.split(' ');
            if(name.length > 1) {
                user.username = name[0].toUpperCase().charAt(0) + name[1].toUpperCase().charAt(0) + name[1].slice(1);
                user.email = user.name.replace(' ', '.') + '@email.com';
                return;
            }
        }
        user.username = '';
        user.email = '';
    };

    $scope.create = function() {
        $scope.newuser.$save(function() {
            window.location.reload();
        });
    };

}]);
