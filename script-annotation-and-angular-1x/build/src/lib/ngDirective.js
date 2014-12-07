define(['./ngBase'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var ngBase = $__0.ngBase;
  var ngDirective = function ngDirective() {
    $traceurRuntime.defaultSuperCall(this, $ngDirective.prototype, arguments);
  };
  var $ngDirective = ngDirective;
  ($traceurRuntime.createClass)(ngDirective, {register: function(app, fn) {
      var $__2 = this;
      var options = {};
      for (var prop in this.options) {
        options[prop] = this.options[prop];
      }
      app.directive(this.name, (function($injector) {
        options.link = $injector.invoke($__2.wrap(fn));
        return options;
      }));
    }}, {}, ngBase);
  return {
    get ngDirective() {
      return ngDirective;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngDirective.map
