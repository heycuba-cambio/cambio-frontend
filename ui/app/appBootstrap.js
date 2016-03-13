/*
* This module is in charge of the application bootstrapping 
*   phase. It checks some preconditions like the user having 
*   already set in email settings and if not, asks him/her 
*   to do so.
*/


var User = require('./utils/User'), 
    MainProcess = require('electron').remote, 
    
    path = require('path');

function appBootstrap(vModal, SettingsModalService, UserService) {
    var cachedUserString = localStorage.getItem('user');
    
    // Try initializing the user based on the stored token
    try {
        UserService.initializeByString(cachedUserString);
    } catch (e) {
        SettingsModalService.activate();
    }
    
    // Add an offline notifier
    window.addEventListener('offline',  function () {
        new Notification('No Internet', {
            body: 'You were disconnected from the internet'
        });
    });
}

module.exports = exports = appBootstrap;