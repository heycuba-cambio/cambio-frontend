(function (window) {
    
    var angular = window.angular, 
        localStorage = window.localStorage,
        
        appBootstrap = require('./app/appBootstrap'), 
        
        AppController = require('./app/AppController'),
        SearchBarController = require('./app/SearchBarController'), 
        DisplayController = require('./app/DisplayController');

    angular
        .module('CambioApp', ['ui.router'])
        .run(appBootstrap)
        .controller('AppController', AppController)
        .controller('SearchBarController', SearchBarController)
        .controller('DisplayController', DisplayController);
    
}(window));