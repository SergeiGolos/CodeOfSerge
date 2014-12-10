define(['./ngBase'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var ngBase = $__0.ngBase;
  function process(imports) {
    var components = [];
    for (var key in imports) {
      var currentImport = imports[key];
      for (var prop in currentImport) {
        var importComponent = currentImport[prop];
        if (prop.indexOf('__') == -1 && importComponent.annotations) {
          var base = importComponent.annotations.filter(function(annotation, index) {
            return annotation instanceof ngBase;
          }) || [];
          if (base.length > 0) {
            components.push({
              constuct: importComponent,
              annotation: base[0]
            });
          }
        }
      }
    }
    return components;
  }
  var ngBootstrap = function ngBootstrap(target, app, imports) {
    var components = process(imports);
    for (var index in components) {
      var component = components[index];
      component.annotation.register(app, component.constuct);
      console.log('Auto-registered: ' + component.annotation.name);
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
