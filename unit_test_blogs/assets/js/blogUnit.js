(function(window) {
    var blogUnit = {};
    //  We start by building a collection of code segments;
    var blocks = {};    
    function CodeBlock(name, source, language) {
        this.name = name;
        this.source = source;
        this.language = language;
        this.code = source.text();
    }
    
    $(".language-blogunit").hide();
    
    CodeBlock.prototype.wrap = function(wrapperFn) {
        return wrapperFn(this.name, this.code);
    }
    CodeBlock.prototype.isRunner = function() {
        return this.language == "blogunit";
    }
    
    CodeBlock.prototype.ready = function() {
        var dependencies = _(["assets/js/boot.js"]).concat(this.code.split(/\n/g))
            .map(_.trim)
            .filter(function(line) {
                return (line.indexOf("#") != 0) && line;
            })
            .map(function(item) {
                return new Promise(function(resolve, reject){ 
                   if (blocks[item]) {
                       resolve(blocks[item].code);
                       return;
                   }
                   
                   var xhr;
                   if (window.XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                   } else if (window.ActiveXObject) {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }

                    xhr.onreadystatechange = function(){ 
                        if (xhr.readyState === 4) 
                            resolve(xhr.responseText); 
                    };
                    xhr.open("GET", _.trim(item));
                    xhr.send();                   
                });                                                         
            })
            .value();                       
        var frame = this.source.next()[0];   
        Promise.all(dependencies).then(function(data) {
            _.each(data, function(script) {             
                var blktScript = script;     
                
                
                ///var data = blanket.processFile(script, "", function(){}, function(){})
                           
                frame.contentWindow.postMessage(blktScript, "*");
            })
            frame.contentWindow.postMessage("(window.blogUnitStart || function() {})()", "*");
        });
    }
    
    CodeBlock.prototype.complete = function(message) {
        this.source.next().height(message);                
    }

    function createHarness(block) {
        var content = encodeURI('<!DOCTYPE html>' + 
            '<html><meta charset="utf-8">' + 
            '<head>'+ 
                '<title>Jasmine Spec Runner v2.4.1</title>' + 
                '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.css">' +                 
                '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.js"></script>' + 
                '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine-html.js" data-cover></script>' +       
                '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/blanket.js/1.1.4/blanket.js"></script>' +                  
                '<script type="text/javascript">' + 
                    'window.runnerName = "' + block.name + '";' + 
                    'window.parent.postMessage({ id: window.runnerName, state : "ready" }, "*");' +
                    'window.addEventListener("message", function(event){' + 
                        'var script = document.createElement("script");' + 
                        'script.setAttribute("type", "text/javascript");' + 
                        'script.text = event.data; ' +
                        'script.setAttribute("data-cover","");' + 
                        'document.body.appendChild(script);' + 
                    '});' +  
                '</script>' +     
            '</head>' + 
            '<body></body>' + 
        '</html>');
        
        var frame =  $("<iframe>");
        frame.attr("src","data:text/html;charset=utf-8," +  content);
        frame.attr("id", block.name);
        frame.css({
            border : "0px",
            width : "100%",
            margin : "0px",
            padding: "0px"
        });                          
        return frame;                    
    }
    
    blogUnit.initialize = function ($codeBlocks) {                  
        var runners = [];
        $codeBlocks.each(function(index, block) {                                               
            var $block = $(block);
            var nameObject = _($block.attr("class").split(" "))
                .filter(function(item) { return item.indexOf("language-", "") == -1 || item.indexOf("name-") == -1; })            
                .reduce(function(hash, value) {
                    if (value) {
                        var data = value.split("-");                    
                        hash[data[0]] = data[1];
                    }
                    return hash;
                    }, {});                                       
            
            blocks[nameObject.name] = new CodeBlock(nameObject.name, $block, nameObject.language);
            if (blocks[nameObject.name].isRunner()) {
                runners.push(blocks[nameObject.name]);
            }            
        });
        window.addEventListener("message", function(event){
            var fn = ((blocks[event.data.id] || {})[event.data.state] || function() { console.log("Function: " + event.data.state +" could not be found.")})                       
            fn.apply(blocks[event.data.id], [event.data.message]);                        
        });
        
        return runners;
    }                               

    blogUnit.run = function(runner) {         
        var frame = createHarness(runner);        
        frame.insertAfter(runner.source);                                       
    }
        
    window.blogUnit = blogUnit;
}(window));

$(function() {    
    var runners = blogUnit.initialize($("code"));
    _.each(runners, function(runner) {
        blogUnit.run(runner);
    });                
});