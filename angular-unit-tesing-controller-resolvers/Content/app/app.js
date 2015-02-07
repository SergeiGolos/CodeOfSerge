(function(angular) {
    'use strict';

    var app = angular.module('app', ['ngRoute']).config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/Home/:message?', {
                templateUrl: 'Home.html',
                controller: 'home',
                resolve: {
                    data: ['$route', function ($route) {
                        return "Test String Data" + $route.current.params.message;
                    }]
                }
            }).otherwise({redirectTo: '/Home'});
        }
    ]);

    app.controller('home', [
        "$scope",
        "data",
        function($scope, data) {
            $scope.message = data;
        }
    ]);
})(window.angular);