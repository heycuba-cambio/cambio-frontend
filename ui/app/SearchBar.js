var validator = require('validator'), 
    
    mailSender = require('./utils/mailSender'), 
    mailReceiver = require('./utils/mailReceiver');


function SearchBarService($rootScope, UserService) {
    
    var searchTerm = "";
    
    function search(newSearchTerm) {
        searchTerm = newSearchTerm;
        
        var urlLocation = "";
        
        if (validator.isFQDN(newSearchTerm)) {
            urlLocation = newSearchTerm;
        } else {
            urlLocation = "https://duckduckgo.com/?q=" + newSearchTerm + 
                "&ia=meanings";
        }
        urlLocation = encodeURIComponent(urlLocation);
        
        var lastEmailUid = localStorage.getItem('lastEmailUid');
        
        return mailSender({
            ssl: UserService.emailService.smtpRequireSSL,
            port: UserService.emailService.smtpServerPort,
            host: UserService.emailService.smtpServerAddress,
            email: UserService.emailAddress,
            password: UserService.password,
            message: urlLocation
        }).then(function () {
            return new Promise(function (resolve, reject) { 
                setTimeout(resolve, 10000);
            });
        }).then(function () {
            return mailReceiver({
                ssl: UserService.emailService.imapRequireSSL,
                port: UserService.emailService.imapServerPort,
                host: UserService.emailService.imapServerAddress,
                email: UserService.emailAddress,
                password: UserService.password
            }).then(function () {
                
            });
        });
    }
    
    return {
        search: search
    };
    
}

function SearchBarController($scope, 
                              SearchBarService, 
                              DisplayContentService) {
    
    var _this = this;
    
    _this.goSearch = function () {
        var searchTerm = _this.searchTerm;
        if (!searchTerm) {
            return;
        }
        
        var loadingMessage = '### Search Inquiry: ' + searchTerm + 
            ' (Loading) \n' +  '----- \n\n';
        DisplayContentService.updateDisplay(loadingMessage);
        
        SearchBarService.search(searchTerm).then(function (emailObj) {
            var successMessage = '### Search Inquiry: ' + searchTerm + '\n' + 
                '----- \n\n';
            successMessage += emailObj.emailContent;
            DisplayContentService.updateDisplay(successMessage);
        }, function (error) {
            var successMessage = '### Search Inquiry: ' + searchTerm +  
                ' (Failed) \n ----- \n\n';
            DisplayContentService.updateDisplay(successMessage);
            new Notification('Failed to Search', {
                body: 'For some reason, your search query failed. ' + 
                'Please try again later'
            });
        });
    };
    
}

exports.Service = SearchBarService;
exports.Controller = SearchBarController;