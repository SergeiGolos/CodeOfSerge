/**
 * IFrameWindow
 */
var rootUrl = "http://localhost/BlogUnit/";
var prepend = '<!DOCTYPE html><html><meta charset="utf-8"><title>Jasmine Spec Runner v2.4.1</title><link rel="shortcut icon" type="image/png" href="'+ rootUrl + 'lib/jasmine-2.4.1/jasmine_favicon.png"><link rel="stylesheet" href="'+ rootUrl + 'lib/jasmine-2.4.1/jasmine.css">';
var postpend = '</head><body></body></html>';

function maplink(item) { 
     return "<script type='text/javascript' src='" + rootUrl + _.trim(item) + "'></script>";
}

function mapcode(item) {
    return "<script type='text/javascript'>" + item + "</script>";
}


function IFrameWindow(element, sideload) {
    var $element = $(element);
    var frame =  $("<iframe>");        
    var libs = ["lib/jasmine-2.4.1/jasmine.js","lib/jasmine-2.4.1/jasmine-html.js","lib/jasmine-2.4.1/boot.js" ];        
    var dependencies = _(element.innerHTML.split("\n")).map(_.trim).filter(function(line) {
        return (line.indexOf("#") != 0) && line;
    }).value();
               
    var scripts = "";
     _(libs).concat(dependencies)                        
        .each(function(item) {
           scripts += (sideload || {})[item] ? mapcode(sideload[item]) : maplink(item);  
        });
    
    frame.insertAfter($element);               
    frame.attr("src","data:text/html;charset=utf-8," +  encodeURI(prepend + scripts + postpend));    
    frame.css({
        border : "0px",
        width : "100%",
        height: "310px"
    });                         
    $element.hide();            
}

$(function() {
    var sideLoad = {};
    var runners = [];
    _.each($("pre"), function(block){ 
        var $block = $(block);
        var name = "";
        if ($block.hasClass("language-blogunit")) {
            runners.push(block);
            return;
        }
        var classList = _.trim($block.find("code").attr("class")).split(" ");
        name = (_.find(classList, function(item) { 
            return item.toLowerCase().indexOf("name-") == 0 
        }) || "").replace("name-", "");
        sideLoad[name] = block.innerText;        
    });
        
    _.each(runners, function(block) {
        IFrameWindow(block, sideLoad);
    });          
});