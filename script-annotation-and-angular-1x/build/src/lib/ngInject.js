define([], function() {
  "use strict";
  var ngInject = function ngInject(inject) {
    this.args = {inject: inject};
  };
  ($traceurRuntime.createClass)(ngInject, {get inject() {
      return this.args.inject;
    }}, {});
  return {
    get ngInject() {
      return ngInject;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngInject.map
