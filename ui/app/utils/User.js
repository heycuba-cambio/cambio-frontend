var lodash = require('lodash'), 
    config = require('../../../config');


function determineProviderSettings(emailDomain) {
    if (emailDomain === "gmail.com") {
        return config.serviceProvider.gmail;
    }
    else if (emailDomain === "yahoo.com") {
        return config.serviceProvider.yahoo;
    }
    else {
        throw new Error("This is not a valid/supported email service " + 
                        "provider.");
    }
}

function validateImapSmtpSettings(imapSmtpSettingsObj) {
    var validationDial = true;
    
    validationDial = imapSmtpSettingsObj.hasOwnProperty("imapServerAddress");
    validationDial = imapSmtpSettingsObj.hasOwnProperty("imapServerPort");
    validationDial = imapSmtpSettingsObj.hasOwnProperty("smtpServerAddress");
    validationDial = imapSmtpSettingsObj.hasOwnProperty("smtpServerPort");
    
    if (!imapSmtpSettingsObj.hasOwnProperty("imapAuthRequired") || 
        typeof imapSmtpSettingsObj.imapAuthRequired !== "boolean") {
        imapSmtpSettingsObj.imapAuthRequired = true;
    }
    if (!imapSmtpSettingsObj.hasOwnProperty("smtpAuthRequired") || 
        typeof imapSmtpSettingsObj.imapAuthRequired !== "boolean") {
        imapSmtpSettingsObj.smtpAuthRequired = true;
    }
    if (!imapSmtpSettingsObj.hasOwnProperty("imapRequireSSL") || 
        typeof imapSmtpSettingsObj.imapAuthRequired !== "boolean") {
        imapSmtpSettingsObj.imapRequireSSL = true;
    }
    if (!imapSmtpSettingsObj.hasOwnProperty("smtpRequireSSL") || 
        typeof imapSmtpSettingsObj.imapAuthRequired !== "boolean") {
        imapSmtpSettingsObj.smtpRequireSSL = true;
    }
    
    if (!validationDial) {
        console.log(imapSmtpSettingsObj);
        throw new Error("Invalid IMAP/SMTP settings. Try again.");
    }
}

function validateEmailCredentials(emailAddress, password) {
    var atSymbolIndex = emailAddress.indexOf('@');
    
    if (!emailAddress || atSymbolIndex === -1) {
        throw new Error("This is not a valid email address");
    }
    if (password === null || password === undefined) {
        throw new Error("This is not a valid email password");
    }
    
    var emailDomain = 
        emailAddress.substr(atSymbolIndex + 1, emailAddress.length);
    if ((['gmail.com', 'yahoo.com']).indexOf(emailDomain) === -1) {
        console.log(emailDomain);
        throw new Error("This is not a supported email service. " + 
                        "Please enter custom settings");
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
        imapAuthRequired: true,
        imapRequireSSL: true,
        
        smtpServerAddress: null,
        smtpServerPort: null,
        smtpAuthRequired: true,
        smtpRequireSSL: true
    };
};


User.prototype.initializeByCredentials = function (emailAddress, password) {
    
    validateEmailCredentials(emailAddress, password);
    
    var emailDomain = 
        emailAddress.substr(emailAddress.indexOf('@')+ 1, emailAddress.length), 
        emailServiceInfo = 
        (determineProviderSettings.bind(this))(emailDomain);
    
    this.emailService = emailServiceInfo;
    this.emailAddress = emailAddress;
    this.password = password;
};


User.prototype.initializeByObject = function (someObject) {
    
    var emailAddress = someObject.emailAddress, 
        password = someObject.password, 
        emailService = someObject.emailService;
    
    validateEmailCredentials(emailAddress, password);
    validateImapSmtpSettings(emailService);
    
    this.emailAddress = emailAddress;
    this.password = password;
    
    if (someObject.emailService && typeof someObject === "object") {
        this.emailService = someObject.emailService;
    }
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


User.prototype.toObject = function () {
    return lodash.clone(this);
};


User.prototype.toString = function () {
    return JSON.stringify({
        emailAddress: this.emailAddress,
        password: this.password,
        emailService: this.emailService
    });
};


module.exports = exports = User;