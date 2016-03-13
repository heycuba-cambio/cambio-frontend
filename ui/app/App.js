function AppController(SettingsModalService) {
    var _this = this;
    
    _this.showSettingsModal = SettingsModalService.activate;
}

exports.Controller = AppController;