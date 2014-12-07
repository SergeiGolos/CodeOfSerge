define([], function() {
  "use strict";
  var ngBase = function ngBase(name, inject, options) {
    this.args = {
      name: name,
      inject: inject || [],
      options: options || {}
    };
  };
  ($traceurRuntime.createClass)(ngBase, {
    wrap: function(fn) {
      var result = [];
      for (var $__1 = this.inject[Symbol.iterator](),
          $__2; !($__2 = $__1.next()).done; ) {
        var item = $__2.value;
        {
          result.push(item);
        }
      }
      result.push(fn);
      return result;
    },
    get name() {
      return this.args.name;
    },
    get inject() {
      return this.args.inject;
    },
    get options() {
      return this.args.options;
    }
  }, {});
  return {
    get ngBase() {
      return ngBase;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngBase.map
