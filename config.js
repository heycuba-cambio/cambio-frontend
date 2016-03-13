module.exports = exports = {
    toEmail: "test@jwgames.me",
    serviceProvider: {
        gmail: {
            imapServerAddress: "imap.gmail.com",
            imapServerPort: "993",
            imapRequireSSL: true,
            smtpServerAddress: "smtp.gmail.com",
            smtpServerPort: "465",
            smtpAuthRequired: true,
            smtpRequireSSL: true
        },
        yahoo: {
            imapServerAddress: "imap.mail.yahoo.com",
            imapServerPort: "993",
            imapRequireSSL: true,
            smtpServerAddress: "smtp.mail.yahoo.com",
            smtpServerPort: "465",
            smtpAuthRequired: true,
            smtpRequireSSL: true
        }
    }
};