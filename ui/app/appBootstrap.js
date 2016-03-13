/*
* This module is in charge of the application bootstrapping 
*   phase. It checks some preconditions like the user having 
*   already set in email settings and if not, asks him/her 
*   to do so.
*/


var User = require('./utils/User'), 
    MainProcess = require('electron').remote;

function appBootstrap() {
    var cachedUserString = localStorage.getItem('user'), 
        user = new User();

    // Try initializing the user based on the stored token
    try {
        user.initializeByString(cachedUserString);
    } catch (e) {
        MainProcess.dialog.showMessageBox({
            type: "info",
            title: "Setup of Email Credentials required",
            message: "It looks like there is currently no stored " + 
            "user in the browser. You will be asked to fill up your " + 
            "email credentials.",
            buttons: ["OK"]
        });
    }
}

module.exports = exports = appBootstrap;