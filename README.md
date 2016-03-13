# Cambio
![Cambio](https://raw.githubusercontent.com/heycuba-cambio/cambio-frontend/master/ui/repoAssets/cambioBanner.png)

Cambio is a web browser that uses IMAP and SMTP under-the-hood to allow the Cuban people to view minified and simplified webpages. Through the use of IMAP/SMTP, users can specify their email address and password, allowing them to obtain web pages through the IMAP/SMTP ports instead of HTTP.

### How things flow
![Workflow](https://raw.githubusercontent.com/heycuba-cambio/cambio-frontend/master/ui/repoAssets/workflowDiagram.png)

### Technologies Used
* [Electron](http://electrong.atom.io/) - Electron is a NodeJS based shell, allowing developers to make cross-platform apps for Linux, Macintosh and Windows using HTML, CSS and Javascript.
* [Inbox](https://github.com/pipedrive/inbox) - Inbox allows us to access a user's set of emails, provided their email address and provider. Currently with this library, we shall be able to provide support for Gmail and YahooMail (assured support)
* [SMTP-Connection](https://www.npmjs.com/package/smtp-connection) - SMTP-Connection allows us to send an email to our email server (cambio-backend) using the user's provided set of email credentials.
* [Photon Kit](http://photonkit.com/) - Photon Kit is a front-end UI CSS framework that allows you to make beautiful Electron-based user interfaces really quickly.
* [Kbpgp](https://keybase.io/kbpgp) - KeybaseIO's implementation of asymmetric PGP encryption. This allows us to encrypt/decrypt messages to and from the server and client. This prevents us the regime from inspecting emails in plaintext.

### About the Team
This project was made by Team Delta Force (Alastair Paragas, Kerlin Michel, Angelo Saraceno, Annabelle Santos) during the HeyCuba! Hackathon, for the greater good of the [ConectaCuba campaign](http://www.fhrcuba.org/connectcuba/).