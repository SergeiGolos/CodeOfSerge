(function (angular) {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngLocale']).config([
        '$routeProvider',
        'dataProvider',
        function ($routeProvider, dataProvider) {
            var data = dataProvider.$get();
            $routeProvider.when('/Home/:message?', {
                templateUrl: 'Home.html',
                controller: 'home',
                resolve: {
                    data: data.home
                }
            }).otherwise({ redirectTo: '/Home' });
        }
    ]);

    app.provider('data', function () {
        return {
            $get: function () {
                return {
                    home: [
                        '$route',
                        '$http',
                        '$q',
                        function ($route, $http, $q) {
                            var deffer = $q.defer();
                            $http.get('/Data').then(function (result) {
                                deffer.resolve([result.data.value, $route.current.params.message].join(' '));
                            });

                            return deffer.promise;
                        }
                    ]
                }
            }
        }
    });

    app.controller('home', [
        "$scope",
        "data",
        function ($scope, data) {
            $scope.message = data;
        }
    ]);
})(window.angular);