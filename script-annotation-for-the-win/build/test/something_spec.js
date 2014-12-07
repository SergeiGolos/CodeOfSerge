define(['../src/something'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var Something = $__0.Something;
  describe('something', function() {
    var something;
    beforeEach(function() {
      something = new Something();
    });
    it('should work', function() {
      expect(something.sum(1, 2)).toBe(3);
    });
    xit('should fail', function() {
      something.sum(1, 'invalid');
    });
  });
  return {};
});

//# sourceMappingURL=something_spec.map
