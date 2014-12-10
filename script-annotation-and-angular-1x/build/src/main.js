define(['./lib/ngController', './lib/ngInject'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var ngController = $__0.ngController;
  var ngInject = $__2.ngInject;
  var main = function main($scope, data) {
    $scope.data = data();
  };
  ($traceurRuntime.createClass)(main, {}, {});
  Object.defineProperty(main, "annotations", {get: function() {
      return [new ngController('main'), new ngInject(['$scope', 'data'])];
    }});
  return {
    get main() {
      return main;
    },
    __esModule: true
  };
});

//# sourceMappingURL=main.map
