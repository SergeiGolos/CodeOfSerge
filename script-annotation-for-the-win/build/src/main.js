define(['./src'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var $__1 = $__0,
      cow = $__1.cow,
      dog = $__1.dog;
  var table = function table() {};
  ($traceurRuntime.createClass)(table, {}, {});
  _.each([cow, dog, table], (function(c) {
    var noop = {speak: (function() {})};
    (c.annotations || [noop])[0].speak();
  }));
  return {};
});

//# sourceMappingURL=main.map
