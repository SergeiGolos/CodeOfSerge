define([], function() {
  "use strict";
  var ngBase = function ngBase(name, options) {
    this.args = {
      name: name,
      options: options || {}
    };
  };
  ($traceurRuntime.createClass)(ngBase, {
    get name() {
      return this.args.name;
    },
    get options() {
      return this.args.options;
    },
    wrap: function(fn) {
      var result = [];
      var injectAnnotation = fn.annotations.filter((function(item, index) {
        return item.constructor.name === "ngInject";
      }));
      var inject = injectAnnotation.length > 0 ? injectAnnotation[0].inject : [];
      for (var $__1 = inject[Symbol.iterator](),
          $__2; !($__2 = $__1.next()).done; ) {
        var item = $__2.value;
        {
          result.push(item);
        }
      }
      result.push(fn);
      return result;
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
