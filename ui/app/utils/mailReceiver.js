var Imap = require('imap'), 
    config = require('../../../config');

/**
* Receives email based on passed information
* @param {Object} options - {
*   ssl,
*   port,
*   host,
*   email,
*   password
* }
* @return Promise
*/
function mailReceiver(options) {

    if (!options.hasOwnProperty('port') || 
        !options.hasOwnProperty('host') || 
        !options.hasOwnProperty('email') || 
        !options.hasOwnProperty('password')) {
        throw new Error("Invalid Options");
    }
    if (typeof options.ssl !== "boolean") {
        throw new Error("options.ssl has to be a Boolean");
    }

    var imapConnection = new Imap({
        user: options.email,
        password: options.password,
        port: options.port,
        host: options.host,
        tls: options.ssl
    });

    var promise = new Promise(function (resolve, reject) {
        imapConnection.once('ready', function () {
            console.log('HIT');
            resolve();
        });
        imapConnection.once('error', function () {
            console.log('ERROR');
            reject();
        });
        imapConnection.connect();
    });

    return promise.then(function () {
        return new Promise(function (resolve, reject) {
            imapConnection.openBox('INBOX', 
                                   true, 
                                   function (err, box) {
                if (err) {
                    reject(err);
                    return;
                }

                var f = imapConnection.seq.fetch(box.messages.total + 
                                                 ':*', 
                                                 { bodies: 
                                                  ['HEADER.FIELDS (FROM)',
                                                   'TEXT'] });
                f.on('message', function(msg, seqno) {
                    var emailContent, emailHeader, emailAttr;
                    msg.on('body', function(stream, info) {
                        var buffer = '';
                        stream.on('data', function(chunk) {
                            buffer += chunk.toString('utf8');
                        });
                        stream.once('end', function() {
                            if (info.which !== 'TEXT') {
                                emailHeader = Imap.parseHeader(buffer);
                            }
                            if (info.which === 'TEXT') {
                                emailContent = buffer;
                            }
                        });
                    });
                    msg.on('attributes', function (attr) {
                        emailAttr = attr;
                    });
                    msg.once('end', function() {
                        resolve({
                            emailHeader: emailHeader,
                            emailContent: emailContent,
                            emailAttribute: emailAttr
                        });
                    });
                });
                f.once('error', function () {
                    reject(new Error("Error accessing messages"));
                });
                
            });
        });
    }).then(function (obj) {
        console.dir(obj);
    }, function (err) {
        console.log(err.message);
    });

}

module.exports = exports = mailReceiver;