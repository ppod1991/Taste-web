'use strict';

angular.module('fantasyApp.controllers.default', ['fantasyApp.services.main'])
    .controller('DefaultController', ['$scope','mainService',
        function ($scope, mainService) {
            mainService.setDefaultParameters();
    }]);