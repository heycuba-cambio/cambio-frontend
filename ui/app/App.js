function AppController($scope, 
                        SettingsModalService, 
                        DisplayContentService, 
                        SearchBarService) {
    var _this = this;

    _this.showSettingsModal = SettingsModalService.activate;
    _this.searches = [];

    $scope.$on('search:responded', function (event, data) {
        if (data) {
            _this.searches.push(data);
        }
    });

}

exports.Controller = AppController;