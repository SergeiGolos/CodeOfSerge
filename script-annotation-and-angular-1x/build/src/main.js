define(['./lib/ngController', './lib/ngInject', './lib/ngRoute'], function($__0,$__2,$__4) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  if (!$__4 || !$__4.__esModule)
    $__4 = {default: $__4};
  var ngController = $__0.ngController;
  var ngInject = $__2.ngInject;
  var ngRoute = $__4.ngRoute;
  var main = function main($scope, data) {
    $scope.data = data();
  };
  ($traceurRuntime.createClass)(main, {}, {});
  Object.defineProperty(main, "annotations", {get: function() {
      return [new ngController('main'), new ngInject(['$scope', 'data']), new ngRoute('/Home', {templateUrl: 'Home.html'})];
    }});
  return {
    get main() {
      return main;
    },
    __esModule: true
  };
});

//# sourceMappingURL=main.map
