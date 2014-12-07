define(['./lib/ngDirective'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var ngDirective = $__0.ngDirective;
  var hello = function hello(data) {
    return (function(scope, element, attr) {
      scope.data = data();
    });
  };
  ($traceurRuntime.createClass)(hello, {}, {});
  Object.defineProperty(hello, "annotations", {get: function() {
      return [new ngDirective('hello', ['data'], {
        scope: true,
        template: '<div> hello {{data}}</div>',
        restrict: 'AE'
      })];
    }});
  return {
    get hello() {
      return hello;
    },
    __esModule: true
  };
});

//# sourceMappingURL=hello.map
