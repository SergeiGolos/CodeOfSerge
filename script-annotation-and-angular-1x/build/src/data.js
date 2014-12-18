define(['./lib/ngFactory'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var ngFactory = $__0.ngFactory;
  var data = function data() {
    return (function() {
      return "test";
    });
  };
  ($traceurRuntime.createClass)(data, {}, {});
  Object.defineProperty(data, "annotations", {get: function() {
      return [new ngFactory('data')];
    }});
  return {
    get data() {
      return data;
    },
    __esModule: true
  };
});
(function(angular, _, $) {
  'use strict';
  
})(angular, _, $);
//# sourceMappingURL=data.map
