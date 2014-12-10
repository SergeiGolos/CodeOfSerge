define([], function() {
  "use strict";
  var Base = function Base(args) {
    this.B = args;
  };
  ($traceurRuntime.createClass)(Base, {}, {});
  var Derived = function Derived(args) {
    this.D = args;
  };
  ($traceurRuntime.createClass)(Derived, {}, {}, Base);
  describe('Tracuer ES5 classes', function() {
    var base = undefined;
    var dervied = undefined;
    beforeEach(function() {
      base = new Base('test');
      dervied = new Derived('test');
    });
    it('base can be verified to be of Base and not Derived', (function() {
      expect(base instanceof Base).toBe(true);
      expect(base instanceof Derived).toBe(false);
    }));
    it('dervied can be verified to be of Derived and Base', (function() {
      expect(dervied instanceof Base).toBe(true);
      expect(dervied instanceof Derived).toBe(true);
    }));
    it('expects the B to be defined on a base object', (function() {
      expect(base.B).toBeDefined();
      expect(base.D).not.toBeDefined();
    }));
    it('expects the D to be defined on a dervied object', (function() {
      expect(dervied.B).not.toBeDefined();
    }));
  });
  return {};
});

//# sourceMappingURL=es6classes_spec.map
