var User = require('./utils/User');

function UserService() {
    var user = new User();
    
    return user;
}

exports.Service = UserService;