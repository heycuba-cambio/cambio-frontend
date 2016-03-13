module.exports = exports = {
    serviceProvider: {
        gmail: {
            imapServerAddress: "imap.gmail.com",
            imapServerPort: "993",
            imapRequireSSL: true,
            smtpServerAddress: "smtp.gmail.com",
            smtpServerPort: "587",
            smtpAuthRequired: true,
            smtpRequireSSL: true
        },
        yahoo: {
            imapServerAddress: "imap.mail.yahoo.com",
            imapServerPort: "993",
            imapRequireSSL: true,
            smtpServerAddress: "smtp.mail.yahoo.com",
            smtpServerPort: "587",
            smtpAuthRequired: true,
            smtpRequireSSL: true
        }
    }
};