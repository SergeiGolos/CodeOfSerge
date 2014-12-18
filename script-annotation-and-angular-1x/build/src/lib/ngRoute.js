define([], function() {
  "use strict";
  var ngRoute = function ngRoute(path, options) {
    this.args = {
      path: path,
      options: options || {}
    };
  };
  ($traceurRuntime.createClass)(ngRoute, {
    get path() {
      return this.args.path;
    },
    get options() {
      return this.args.options;
    }
  }, {});
  return {
    get ngRoute() {
      return ngRoute;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngRoute.map
