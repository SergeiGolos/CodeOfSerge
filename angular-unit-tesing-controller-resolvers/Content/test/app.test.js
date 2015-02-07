/// <reference path="../scripts/angular.js" />
/// <reference path="../scripts/angular-route.js" />
/// <reference path="../scripts/angular-mocks.js" />
/// <reference path="../scripts/i18n/angular-locale_en-us.js" />
/// <reference path="../app/app.js" />
describe('Testing A Resolver dataProvider', function () {
    var _data;
    var _q;
    var fn;
    var _timeout;
    beforeEach(function() {
        angular.mock.module('app');
        angular.mock.inject(['data', '$q', '$timeout', function(data, $q, $timeout) {
            _timeout = $timeout;
            _data = data;
            _q = $q;
            fn = _data.home[_data.home.length - 1];
        }]);
    });

    it('The home resolve object is an array', function() {
        expect(angular.isArray(_data.home)).toBe(true);
    });

    it('The last item on the object is a function', function () {        
        expect(angular.isFunction(fn)).toBe(true);
    });

    describe('Execute the resolver', function() {
        var _http;
        var _route;

        // Creating some mock objects to resolve inside my function.
        beforeEach(function() {
            _route = { current: { params: { message: 'test' } } }
            _http = {
                get: function() {
                    var defer = _q.defer();
                    defer.resolve({ data: { value: 'test' } });
                    return defer.promise;
                }
            }
        });

        it('The the promise resolves to a combination of the get results and route messages', function() {
            var result = fn(_route, _http, _q);

            expect(angular.isFunction(result.then)).toBe(true);
            result.then(function(data) {                
                expect(data).toBe('test test');                
            });

            _timeout.flush();
        });
    });
});