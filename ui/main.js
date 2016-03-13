(function (window) {
    
    var angular = window.angular, 
        localStorage = window.localStorage,
        
        appBootstrap = require('./app/appBootstrap'), 
        
        App = require('./app/App'),
        SearchBar = require('./app/SearchBar'), 
        DisplayContent = require('./app/DisplayContent'), 
        SettingsModal = require('./app/SettingsModal'),
        User = require('./app/User');

    angular
        .module('CambioApp', ['vModal', 'ngSanitize'])
        .run(appBootstrap)
    
        .controller('SearchBarController', 
                    SearchBar.Controller)
        .controller('DisplayContentController', 
                    DisplayContent.Controller)
        .controller('SettingsModalController', 
                    SettingsModal.Controller)
        .controller('AppController', 
                    App.Controller)
        
        .factory('SearchBarService', SearchBar.Service)
        .factory('DisplayContentService', DisplayContent.Service)
        .factory('SettingsModalService', SettingsModal.Service)
        .factory('UserService', User.Service);
    
}(window));