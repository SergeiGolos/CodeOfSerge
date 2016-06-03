(function (window) {             
   function HtmlDocument(title, block) {
       this.scripts = [];
       this.style = [];       
       this.block = block;      
       this.title = title;                             
   }
   
   HtmlDocument.prototype.css =  function(target) {
       this.style.push('<link rel="stylesheet" type="text/css" href="'+ target + '" />');     
       return this; 
   }
   HtmlDocument.prototype.script =  function(target) {
       this.style.push('<script type="text/javascript" src="' + target + '"></script>');
       return this;       
   }      
   HtmlDocument.prototype.toFrame = function() {
       var frame = $("<iframe>");
       var html = '<!DOCTYPE html>' +
              '<html><meta charset="utf-8">' +
              '<head>' +
                '<title>' + this.title + '</title>' +
                this.style.join('') + 
                this.scripts.join('') +
                '<script type="text/javascript">' +
                    'window.runnerName = "' + this.block.name + '";' +
                    'window.notifyComplete = function() { window.parent.postMessage({ id: window.runnerName, state : "complete" }, "*");  };' + 
                    'window.parent.postMessage({ id: window.runnerName, state : "ready" }, "*");' +
                    'window.addEventListener("message", function(event){' +
                        'var script = document.createElement("script");' +
                        'script.setAttribute("type", "text/javascript");' +
                        'script.text = event.data; ' +
                        'document.body.appendChild(script);' +
                    '});' +
                '</script>' +                 
            '</head>' +             
            '<body>' +
            '</body>' +
            '</html>';
                                
        frame.attr("src", "data:text/html;charset=utf-8," + encodeURI(html));
        frame.attr("id", this.block.name);
        frame.css({
            border: "0px",
            width: "100%",
            margin: "0px",
            padding: "0px"
        });
        return frame;                                    
   }        
     
    var blogUnit = {};    
    var blocks = {};
    var handlers = {
        javascript : JavascriptHandler,
        blogunit : TestRunnerHandler,
        runner : RunnerHandler        
    }
    
    function ScriptResolver (item) {
            return new Promise(function (resolve, reject) {
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

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4)
                        resolve(xhr.responseText);
                };
                var url = _.trim(item);                    
                xhr.open("GET", (url.indexOf("http")  == 0 ? "" : (document.location.origin + "/")) + url);
                xhr.send();
            });
        }
   
                  
    function Block(element) {
        this.element = $(element);
        var nameObject = _(this.element.attr("class").split(" "))
                .filter(function (item) { return item.indexOf("language-", "") == -1 || item.indexOf("name-") == -1; })
                .reduce(function (hash, value) {
                    if (value) {
                        var data = value.split("-");
                        hash[data[0]] = data[1];
                    }
                    return hash;
                }, {});
                
        this.name = nameObject["name"];
        this.language = nameObject["language"];
        this.code = this.element.text();
        
        this.readyFn = handlers[this.language].bind(this)().bind(this);        
    }    
    
    Block.prototype.ready = function() {
        this.readyFn();           
    }
    Block.prototype.complete = function (message) {
        var s = this.element;
        s.next().height(message);
    }
    
    function JavascriptHandler() {        
        return function() {                                  
        }
    }
    function RunnerHandler() {
        var element = this.element;
        var code = this.code;
        var doc = new HtmlDocument("JavaScript Runner", this);                                        
        var frame = doc.toFrame();
        frame.insertAfter(element);
        return function () {            
            element.hide();            
            loader(code, frame);
        }
    }
    
    function TestRunnerHandler() {
        var element = this.element;
        var code = this.code;        
        var doc = new HtmlDocument("JavaScript Test Runner", this)    
            .css("https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.css")
            .script("https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine.js")
            .script("https://cdnjs.cloudflare.com/ajax/libs/jasmine/2.4.1/jasmine-html.js");
        var frame = doc.toFrame();
        
        frame.insertAfter(element);            
        return function() {                    
            element.hide();            
            loader("assets/js/boot.js\n" + code, frame, function(frameWindow) { 
                frameWindow.postMessage("window.blogUnitStart()", "*");
            });        
        }
    }           
    
    function loader (code, frame, loaded) {
        var dependencies = _(code.split(/\n/g))
            .map(_.trim)
            .filter(function (line) {
                return (line.indexOf("#") != 0) && line;
            })
            .map(ScriptResolver)
            .value();
                    
        Promise.all(dependencies).then(function (data) {
            _.each(data, function (script) {
                frame[0].contentWindow.postMessage(script, "*");
            });
            (loaded || function() {})(frame[0].contentWindow);            
        });
    }

    function initialize($codeBlocks) {
        var runners = [];        
        $codeBlocks.each(function (index, block) {
            var blockObject = new Block(block);
            if (blockObject.name) {
                blocks[blockObject.name] = blockObject;
            }                                                             
        });
        window.addEventListener("message", function (event) {
            var fn = ((blocks[event.data.id] || {})[event.data.state] || function () { console.log("Function: " + event.data.state + " could not be found.") })
            fn.apply(blocks[event.data.id], [event.data.message]);
        });

        return runners;
    }    
    window.ghostRunner = { initialize : initialize };
} (window));

$(function() {    
    window.ghostRunner.initialize($("code"));        
});

               