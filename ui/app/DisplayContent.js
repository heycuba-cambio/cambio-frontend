var marked = require('marked'), 
    jquery = require('jquery'),
    welcomeMessage = require('./welcomeMessage');


function DisplayContentService($rootScope, $compile) {
    
    var contents = "", 
        renderer = new marked.Renderer();
    
    function htmlTree(scopeObject) {
        renderer.link = function (href, title, text) {
            return '<a href="#" ' + 
                'ng-click="DisplayContentController.goTo(\'' + 
                href + '\')">' + text + '</a>';
        };
        renderer.image = function (href, title, text) {
            return '<img style="max-width:100%;" alt="' + 
                text + '" src="' + href + '">';
        };
        return ($compile(marked(contents, 
                                    {renderer: renderer})))(scopeObject);
    }
    
    function updateDisplay(newContents) {
        contents = newContents;
        $rootScope.$broadcast('display:updated', newContents);
    }
    
    return {
        updateDisplay: updateDisplay,
        htmlTree: htmlTree
    };
    
}

function DisplayContentController(DisplayContentService, 
                                   SearchBarService, 
                                   $scope) {
    var _this = this;
    
    // If markdown content changes, update display
    $scope.$on(
        'display:updated', 
        function (event, data) {
            if (data) {
                jquery('#displayContent #contentBox')
                    .html(DisplayContentService.htmlTree($scope));
            } else {
                
            }
        });
    
    _this.goTo = function (link) {
        console.log(link);
    };
    
    
    DisplayContentService.updateDisplay(welcomeMessage);
}

exports.Service = DisplayContentService;
exports.Controller = DisplayContentController;