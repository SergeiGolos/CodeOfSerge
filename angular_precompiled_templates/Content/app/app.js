(function (angular, _) {
    'use strict';

    var lib = angular.module('cplodash', []);
    lib.factory('templateCompiler', [
        '$compile',
        '$rootScope',
        function ($compile, $rootScope) {
            var compileContainer = $('<div class="hidden" />').appendTo('body');
            var _compile = function(id, value) {
                var element = compileContainer.find("[data-template='" + id + "']");
                if (element.length === 0) {
                    element = $('<div data-template="' + id + '" />').appendTo(compileContainer);
                }
                element.html(value);
                return $compile(element[0].children);
            };
            return {
                updateTemplate: function updateTemplate(id, template, data) {
                    var tmpl = {
                        template: template,
                        link: _compile(id, template(data))
                    };
                               
                    $rootScope.$broadcast('cplodash-update', { id: id, link: tmpl.link });
                    return tmpl;
                },

                compile: _compile
            };
        }
    ]);

    lib.factory('lodashTemplateProvider', [        
        'templateCompiler',
        '$cacheFactory',
        '$q',
        function(templateCompiler, $cacheFactory, $q) {
            var lazyLoad = {};
            var lodashCache = $cacheFactory('lodashTemplates');                       

            return {
                load: function(id, value) {
                    var tmpl = {
                        template: _.template(value)
                    };
                    lodashCache.put(id, tmpl);
                    if (lazyLoad[id]) {
                        lazyLoad[id](tmpl.template);
                    }
                },
                linker : function(id) {
                    var tmpl = lodashCache.get(id);
                    if (!tmpl) return _.noop;

                    return tmpl.link;
                },
                update: function (id, data) {
                    var tmpl = lodashCache.get(id);
                    if (!tmpl) {
                        var defer = $q.defer();
                        lazyLoad[id] = defer.resolve;
                        defer.promise.then(function(template) {
                            lodashCache.put(id, templateCompiler.updateTemplate(id, template, data));
                        });                       
                        return;
                    }

                    lodashCache.put(id, templateCompiler.updateTemplate(id, tmpl.template, data));
                }
            };
        }
    ]);

    lib.directive('script', [        
        'lodashTemplateProvider',      
        function (lodashTemplateProvider) {            
            return {
                restrict: 'E',
                terminal: true,
                compile: function (element, attr) {
                    if (attr["type"].toLowerCase() !== "text/lodash-template") {
                        return;
                    }
                    lodashTemplateProvider.load(attr["id"], element.html());
                }
            }           
        }
    ]);

    lib.directive('loTemplateTrigger', [
        'lodashTemplateProvider',
        function(lodashTemplateProvider) {
            return {         
                scope: {
                    model : "=loTemplateTrigger"  
                },
                link: function (scope, element, attr) {
                    if (!attr["template"]) return;
                    scope.$watch('model', function (newValue, oldValue) {
                        lodashTemplateProvider.update(attr["template"], newValue);
                    });                    
                }
            }
        }
    ]);
    
    lib.directive('loTemplate', [
        'lodashTemplateProvider',
        '$animate',
        function(lodashTemplateProvider, $animate) {
            return {
                transclude: 'element',
                replace : false,
                scope: {
                    model: "="
                },
                link: function(scope, element, attr, controller, $transclude) {
                    var currentNode;
                    if (!attr["loTemplate"]) {
                        throw "loTempalte could not bind to empty template.";
                    }

                    function update(template) {
                        $transclude(scope, function(clone) {                            
                            element.empty();
                            element.append(clone.html(template(scope)));                            
                        });                        
                    }
                
                    scope.$watch(attr.loTemplate, function (value) {
                        if (value) {
                            update(lodashTemplateProvider.linker(attr["loTemplate"]));
                            return;
                        }
                        update(_.noop);
                    });

                    scope.$on('cplodash-update', function(event, data) {
                        if (data.id !== attr["loTemplate"]) return;
                        update(data.link);
                    });
                }
            };
        }
    ]);


    var app = angular.module('app', ['cplodash']);
    app.controller('default', function($scope) {
        $scope.view = {
            columns: ["column1", "column2"],
            data: [
                { column1: 'r1c1', column2: 'r1c2' },
                { column1: 'r2c1', column2: 'r2c2' },
                { column1: 'r3c1', column2: 'r3c2' }
            ]
        };
    });

})(window.angular, window._);