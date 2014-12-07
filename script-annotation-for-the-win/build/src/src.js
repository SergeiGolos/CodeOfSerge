define([], function() {
  "use strict";
  var animal = function animal(sound) {
    this.sound = sound;
  };
  ($traceurRuntime.createClass)(animal, {speak: function() {
      console.log(this.sound);
    }}, {});
  var cow = function cow() {};
  ($traceurRuntime.createClass)(cow, {}, {});
  Object.defineProperty(cow, "annotations", {get: function() {
      return [new animal('Mooo')];
    }});
  var dog = function dog() {};
  ($traceurRuntime.createClass)(dog, {}, {});
  Object.defineProperty(dog, "annotations", {get: function() {
      return [new animal('Woof')];
    }});
  return {
    get cow() {
      return cow;
    },
    get dog() {
      return dog;
    },
    __esModule: true
  };
});

//# sourceMappingURL=src.map
