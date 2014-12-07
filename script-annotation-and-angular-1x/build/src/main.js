define(['./lib/ngController'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var ngController = $__0.ngController;
  var main = function main($scope, data) {
    $scope.data = data();
  };
  ($traceurRuntime.createClass)(main, {}, {});
  Object.defineProperty(main, "annotations", {get: function() {
      return [new ngController('main', ['$scope', 'data'])];
    }});
  return {
    get main() {
      return main;
    },
    __esModule: true
  };
});

//# sourceMappingURL=main.map
