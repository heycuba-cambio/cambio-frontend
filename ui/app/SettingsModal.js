var User = require('./utils/User');

function SettingsModalService(vModal) {
    var settingsModal = vModal({
        controller: 'SettingsModalController',
        controllerAs: 'SettingsModalController',
        templateUrl: 'app/SettingsModal.html'
    });
    
    return settingsModal;
}

function SettingsModalController(SettingsModalService, UserService) {
    var _this = this;
    
    _this.formInvalid = false;
    _this.formInvalidMessage = "";
    _this.customFormShown = false;
    
    _this.user = UserService.toObject();
    
    if (_this.user.emailAddress === null || 
        _this.user.password === null) {
        _this.user = {
            emailAddress: "",
            password: "",
            emailService: ""
        };
    }
    
    _this.save = function () {
        _this.formInvalid = false;
        _this.formInvalidMessage = "";
        try {
            if (_this.customFormShown === false) {
                UserService.initializeByCredentials(
                    _this.user.emailAddress, 
                    _this.user.password
                );
            } else {
                UserService.initializeByObject(_this.user);
            }
        } catch (e) {
            _this.formInvalid = true;
            _this.formInvalidMessage = e.message;
        }
        
        if (_this.formInvalid !== true) {
            localStorage.setItem('user', UserService.toString());
            SettingsModalService.deactivate();
        }
    };
    
    _this.showCustomForm = function () {
        _this.customFormShown = true;
    };
    _this.hideCustomForm = function () {
        _this.customFormShown = false;
    };
    
}

exports.Service = SettingsModalService;
exports.Controller = SettingsModalController;