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
      app.controller(this.name, this.wrap(fn));
    }}, {}, ngBase);
  return {
    get ngController() {
      return ngController;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngController.map
