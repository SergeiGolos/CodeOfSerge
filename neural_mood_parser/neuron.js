var Neuron = (function () {
    function Neuron(id, state) {
        this.id = id;
        this.state = state;
        this.clearInputs();
    }
    Neuron.prototype.clearInputs = function () {
        this.sinapsis = [];
    };
    Neuron.prototype.setInputs = function (sinapse) {
        this.sinapsis.push(sinapse);
    };
    Neuron.prototype.trigger = function (sinapsis) {
        sinapsis = sinapsis || this.sinapsis;
        if (!sinapsis || sinapsis.length == 0)
            return;
        var inputSet = sinapsis.map(function (item) {
            return item.neuron.state * item.weight;
        });
        var newState = inputSet.reduce(function (sum, item) { return sum + item; }, 0) / inputSet.length;
        sinapsis.forEach(function (item) { return item.weight = (item.weight + newState) / 2; });
        this.state = newState > .4 ? 1 : 0;
    };
    return Neuron;
}());
var Sinapse = (function () {
    function Sinapse(weight, neuron) {
        this.weight = weight;
        this.neuron = neuron;
    }
    return Sinapse;
}());
var Layer = (function () {
    function Layer(size, preseed) {
        this.size = size;
        this.neurons = [];
        preseed = preseed || [];
        for (var index = 0; index < size; index++) {
            this.neurons.push(new Neuron(index, preseed[index] || 0));
        }
    }
    Layer.prototype.trigger = function () {
        this.neurons.forEach(function (element) {
            element.trigger();
        });
        (this.next || { trigger: function () { } }).trigger();
    };
    Layer.prototype.bindTo = function (layer) {
        layer.next = this;
        this.neurons.forEach(function (oNeuron) {
            oNeuron.clearInputs();
            layer.neurons.forEach(function (iNeuron) {
                var sinapse = new Sinapse(.2 + (Math.random() - .5), iNeuron);
                oNeuron.setInputs(sinapse);
            });
        });
        return layer;
    };
    return Layer;
}());
var output = new Layer(5);
var second = output.bindTo(new Layer(20));
var first = second.bindTo(new Layer(20));
var currentMap = first.bindTo(new Layer(10, [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]));
currentMap.trigger();
console.log(output.neurons[0]);
currentMap.trigger();
console.log(output.neurons[0]);
function defaultFn(data) {
    console.log("DefaultFunctionRun");
}
function passFn(data) {
    console.log("PassedFunctionRun");
}
function test(data, fn) {
    (fn || defaultFn)(data);
    (fn && defaultFn)(data);
}
console.log("Passing function");
test({}, passFn);
console.log("Passing Undefined");
test({});
