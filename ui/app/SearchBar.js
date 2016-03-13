var validator = require('validator'), 
    
    mailSender = require('./utils/mailSender'), 
    User = require('./utils/User');


function SearchBarService() {
    
    function search(searchTerm) {
        
    }
    
    return {
        search: search
    };
    
}

function SearchBarController(SearchBarService) {
    
    var _this = this;
    
    _this.goSearch = function () {
        SearchBarService.search(_this.searchTerm);
    };
    
}

exports.Service = SearchBarService;
exports.Controller = SearchBarController;