define(['./ngBase'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var ngBase = $__0.ngBase;
  var ngController = function ngController() {
    $traceurRuntime.defaultSuperCall(this, $ngController.prototype, arguments);
  };
  var $ngController = ngController;
  ($traceurRuntime.createClass)(ngController, {register: function(app, fn) {
      var routes = this.find(fn, 'ngRoute');
      var controllerName = this.name;
      app.controller(controllerName, this.wrap(fn));
      return function($routeProvider) {
        _.each(routes, function(route) {
          $routeProvider.when(route.path, _.assign({controller: controllerName}, route.options));
        });
      };
    }}, {}, ngBase);
  return {
    get ngController() {
      return ngController;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngController.map
