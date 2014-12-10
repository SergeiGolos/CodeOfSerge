define([], function() {
  "use strict";
  var ngInject = function ngInject(inject) {
    this.inject = inject;
  };
  ($traceurRuntime.createClass)(ngInject, {}, {});
  return {
    get ngInject() {
      return ngInject;
    },
    __esModule: true
  };
});

//# sourceMappingURL=ngInject.map
