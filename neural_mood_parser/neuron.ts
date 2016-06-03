class Neuron {        
    public sinapsis : Sinapse[];
    constructor(public id, public state: number) {
        this.clearInputs();        
    }                      
    clearInputs() {
        this.sinapsis = [];
    }
    setInputs(sinapse : Sinapse) {
        this.sinapsis.push(sinapse);
    }
    
    trigger(sinapsis? : Sinapse[]) {            
        sinapsis = sinapsis || this.sinapsis;
        
        if (!sinapsis || sinapsis.length == 0) return;            
        var inputSet = sinapsis.map(item => {
            return item.neuron.state * item.weight
        });
        var newState = inputSet.reduce((sum, item) => sum + item, 0) / inputSet.length;        
                        
        sinapsis.forEach(item=> item.weight = (item.weight + newState)/2);
        this.state = newState  > .4 ? 1 : 0;
    }    
}

class Sinapse {    
    constructor(public weight : number, public  neuron : Neuron ) { }       
}


class Layer {
    public neurons : Neuron[];     
    public next : Layer;
    
    constructor(private size: number, preseed? : number[]) {        
        this.neurons = [];            
        preseed = preseed || []; 
        for(var index = 0; index < size; index++) {            
            this.neurons.push(new Neuron(index, preseed[index] || 0));                        
        }    
    }
    
    trigger() {        
        this.neurons.forEach(element => {
            element.trigger();
        });
        (this.next || { trigger : () => {}}).trigger();
    }
    
    bindTo(layer: Layer) {
        layer.next = this; 
        this.neurons.forEach(oNeuron => {
            oNeuron.clearInputs();
            layer.neurons.forEach(iNeuron => {
                var sinapse = new Sinapse(.2 + (Math.random() - .5), iNeuron);
                oNeuron.setInputs(sinapse);
            });
        });
                
        return layer;
    }       
}


var output = new Layer(5);
var second = output.bindTo(new Layer(20))
var first = second.bindTo(new Layer(20))
var currentMap = first.bindTo(new Layer(10, [0,0,0,0,0,1,1,1,1,1])); 

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



function test (data, fn?) {
    (fn || defaultFn)(data);    
    ((fn && defaultFn) || function() { console.log("alternate")})(data);
}

console.log("Passing function");
test({}, passFn);


console.log("Passing Undefined");
test({});








 
