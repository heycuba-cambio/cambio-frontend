var lodash = require('lodash'), 
    config = require('../../../config');

function determineProviderSettings(emailDomain) {
    if (emailDomain === "gmail.com") {
        this.emailService = config.serviceProvider.gmail;
    }
    else if (emailDomain === "yahoo.com") {
        this.emailService = config.serviceProvider.yahoo;
    }
    else {
        throw new Error("This is not a valid/supported email service " + 
                        "provider.");
    }
}


/**
* Represents a User of the application. Has the following 
*   methods: reset(), 
*   initializeByCredentials(), 
*   initializeByString(), 
*   and toString()
*/
function User() {
    if (!(this instanceof User)) {
        return new User();
    }
    
    this.reset();
}

User.prototype.reset = function () {
    this.emailAddress = null;
    this.password = null;
    
    this.emailService = {
        imapServerAddress: null,
        imapServerPort: null,
        imapAuthRequired: null,
        imapRequireSSL: null,
        
        smtpServerAddress: null,
        smtpServerPort: null,
        smtpAuthRequired: null,
        smtpRequireSSL: null
    };
};

User.prototype.initializeByCredentials = function (emailAddress, password) {
    
    var atSymbolIndex = emailAddress.indexOf('@');
    if (atSymbolIndex === -1) {
        throw new Error("This is not a valid email address");
    }
    if (password === null || password === undefined) {
        throw new Error("This is not a valid email password");
    }
    
    var emailDomain = 
        atSymbolIndex.substr(atSymbolIndex + 1, emailAddress.length);
    
    this.emailService = (determineProviderSettings.bind(this))(emailDomain);
    this.emailAddress = emailAddress;
    this.password = password;
};

User.prototype.initializeByString = function (someString) {
    
    var parsedUserObject = null; 
    parsedUserObject = JSON.parse(someString);
    
    if (!parsedUserObject || typeof parsedUserObject !== "object") {
        throw new Error("Not a valid cached user.");
    }
    
    lodash.assign(this, parsedUserObject, function (destVal, srcVal, 
                                                     keyName, destObj) {
        if ((['emailAddress', 
              'password', 
              'emailService']).indexOf(keyName) > -1) {
            destObj[keyName] = srcVal;
        }
    });
    
    // Email Service information is invalid - try determining it instead 
    // based on the other sorts of data we have
    if (this.emailService === null || 
        !(this.emailService instanceof Object)) {
        this.emailService = 
            (determineProviderSettings.bind(this))(this.emailAddress);
    }
};

User.prototype.toString = function () {
    return JSON.stringify({
        emailAddress: this.emailAddress,
        password: this.password,
        emailService: this.emailService
    });
};

module.exports = exports = User;