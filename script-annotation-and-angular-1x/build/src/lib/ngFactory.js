define(['./ngBase'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var ngBase = $__0.ngBase;
  var ngFactory = function ngFactory() {
    $traceurRuntime.defaultSuperCall(this, $ngFactory.prototype, arguments);
  };
  var $ngFactory = ngFactory;
  ($traceurRuntime.createClass)(ngFactory, {register: function(app, fn) {
      app.factory(this.name, this.wrap(fn));
    }}, {}, ngBase);
  return {
    get ngFactory() {
      return ngFactory;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngFactory.map
