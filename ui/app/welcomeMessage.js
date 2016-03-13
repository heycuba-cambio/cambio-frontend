var path = require('path'),
    
    bannerPath = path.join(__dirname, '../repoAssets/cambioBanner.png'),
    diagramPath = path.join(__dirname, '../repoAssets/workflowDiagram.png');

module.exports = exports = 
    "![Cambio Logo](" + bannerPath + ") \n\n" + 
    "# Welcome to Cambio! \n" + 
    "Cambio is a web browser that uses IMAP and SMTP under-the-hood to allow the Cuban people to view minified and simplified webpages. Through the use of IMAP/SMTP, users can specify their email address and password, allowing them to obtain web pages through the IMAP/SMTP ports instead of HTTP. \n\n" + 
    "## How it Works \n" + 
    "![How Cambio Works](" + diagramPath +") \n\n"
;