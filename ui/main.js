(function (window) {
    
    var angular = window.angular, 
        localStorage = window.localStorage,
        
        appBootstrap = require('./app/appBootstrap'), 
        
        AppComponent = require('./app/App'),
        SearchBarComponent= require('./app/SearchBar'), 
        DisplayContentComponent= require('./app/DisplayContent'), 
        SettingsModalComponent = require('./app/SettingsModal');

    angular
        .module('CambioApp', ['ui.router', 'vModal'])
    
        .run(appBootstrap)
        .controller('AppController', AppComponent)
        .controller('SearchBarController', SearchBarComponent)
        .controller('DisplayController', DisplayContentComponent)
        
        .controller('SettingsModalController', 
                    SettingsModalComponent.SettingsModalController)
        .service('SettingsModalService', 
                 SettingsModalComponent.SettingsModalService);
    
}(window));