(function(window, $) {
   
    function StackViewContainer(target) {
        var $target = $(target);
        this.container = $("<div class='rx-stack-container'>");
        this.container.appendTo($target);                       
    }
    
    StackViewContainer.prototype.subscribe = function(observable, label) {
        if (label) {
             $("<div class='rx-stack-textrow'>").text(label).appendTo(this.container);
        }      
        var stack = new StackView(this.container);  
        observable.subscribe(
            stack.NextEvent.bind(stack), 
            stack.ErrorEvent.bind(stack),
            stack.CompleteEvent.bind(stack));
    } 
    
    function StackView(target, binding) {
        this.element = $("<div class='rx-stack-row'>");
        this.element.appendTo(target);
        
        this.binding = (binding || function(element) {
               return function(data, type) {
                      var $element = $(element);
                      var width = $element.innerWidth();                      
                      $element.append("<div class='rx-stack-node " + type + "'>" + data + "</div>");
                      var sum = 0;
                      var array = element.children();
                      for (var index = 0; index < array.length; index++) {
                          var node = $(array[index]);
                          sum += node.outerWidth() +5;
                      }
                      
                      if (sum > width) {
                          $(array[0]).remove();
                      }                                            
               };
        })(this.element);                
    }
    
    StackView.prototype.NextEvent = function(data) {
        this.binding(data, "rx-stack-next");
        return data;        
    }
    
    StackView.prototype.CompleteEvent = function() {
        this.binding("D", "rx-stack-complete");
    }
    
    StackView.prototype.ErrorEvent = function() {
        this.binding("E", "rx-stack-error");
    }
    
    window.StackViewContainer = StackViewContainer;
    window.StackView = StackView;
})(window, window.$);