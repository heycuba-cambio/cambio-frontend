var SmtpConnection = require('smtp-connection'),
    config = require('../../../config');

/**
* Sends email based on passed information
* @param {Object} options - {
*   ssl,
*   port,
*   host,
*   email,
*   password,
*   message
* }
* @return Promise
*/
function mailSender(options) {

    if (!options.hasOwnProperty('port') || 
        !options.hasOwnProperty('host') || 
        !options.hasOwnProperty('email') || 
        !options.hasOwnProperty('password')) {
        throw new Error("Invalid Options");
    }
    if (!options.hasOwnProperty('message')) {
        throw new Error("No message");
    }
    if (typeof options.ssl !== "boolean") {
        throw new Error("options.ssl has to be a Boolean");
    }

    var smtpConnection = new SmtpConnection({
            port: options.port,
            host: options.host,
            secure: options.ssl
        }), 
        message = options.message || '', 
        promise = new Promise(function (resolve, reject) {
            smtpConnection.on('error', function () {
                reject(new Error("Cannot connect to SMTP Host"));   
            });
            smtpConnection.on('connect', function () {
                resolve();   
            });
            smtpConnection.connect();
        });
    
    return promise.then(function () {
        return new Promise(function (resolve, reject) {
            smtpConnection.login({
                user: options.email,
                pass: options.password
            }, function (err) {
                if (err instanceof Error) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }).then(function () {
        return new Promise(function (resolve, reject) {
            smtpConnection.send({
                from: options.email,
                to: config.toEmail
            }, options.message, function (err) {
                if (err instanceof Error) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }).then(function () {
        smtpConnection.quit();
    }); 
    
}

module.exports = exports = mailSender;