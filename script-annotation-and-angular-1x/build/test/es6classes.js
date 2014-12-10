define([], function() {
  "use strict";
  var Base = function Base(args) {};
  ($traceurRuntime.createClass)(Base, {}, {});
  var Derived = function Derived() {
    $traceurRuntime.defaultSuperCall(this, $Derived.prototype, arguments);
  };
  var $Derived = Derived;
  ($traceurRuntime.createClass)(Derived, {}, {}, Base);
  describe('Tracuer ES5 classes', function() {
    var base = undefined;
    var dervied = undefined;
    beforeEach(function() {
      base = new Base('test');
      dervied = new Derived('test');
    });
    it('result of typeof in valid strings', function() {
      expect(typeof(base)).toBe();
    });
  });
  return {};
});

//# sourceMappingURL=es6classes.map
