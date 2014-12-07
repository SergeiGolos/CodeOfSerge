define([], function() {
  "use strict";
  var ngBootstrap = function ngBootstrap(target, app, imports) {
    var types = [];
    for (var key in imports) {
      for (var prop in imports[key]) {
        var importComponent = imports[key][prop];
        if (prop.indexOf('__') == -1 && importComponent.annotations) {
          var component = importComponent.annotations[0];
          component.register(app, importComponent);
          console.log('Auto-registered: ' + component.name);
        }
      }
    }
    angular.bootstrap(target, [app.name]);
  };
  ($traceurRuntime.createClass)(ngBootstrap, {}, {});
  return {
    get ngBootstrap() {
      return ngBootstrap;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngBootstrap.map
