define(['./lib/ngDirective', './lib/ngInject'], function($__0,$__2) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  if (!$__2 || !$__2.__esModule)
    $__2 = {default: $__2};
  var ngDirective = $__0.ngDirective;
  var ngInject = $__2.ngInject;
  var hello = function hello(data) {
    return (function(scope, element, attr) {
      scope.data = data();
    });
  };
  ($traceurRuntime.createClass)(hello, {
    compile: function() {},
    contoller: function() {}
  }, {});
  Object.defineProperty(hello, "annotations", {get: function() {
      return [new ngDirective('hello', {
        scope: true,
        template: '<div> hello {{data}}</div>',
        restrict: 'AE'
      }), new ngInject(['data'])];
    }});
  return {
    get hello() {
      return hello;
    },
    __esModule: true
  };
});

//# sourceMappingURL=hello.map
