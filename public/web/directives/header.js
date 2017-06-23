app.directive('header', function () {
    return {
        restrict: 'E',
        templateUrl: "./web/views/layout/header.html",
        scope: {
          delegates: '=?',
          invokes: '=?',
          configs: '=?',
        },
        controller: ['$scope', '$filter', 'urlService', function ($scope, $filter, urlService) {

            // Start Parameter
            $scope.link = {
                detail: "",
                home: "",
            }
            // End Parameter

            // Start Function
            $scope.init = function(){
                $scope.link.rtdata = urlService.server()+"/rtdata";
                $scope.link.vibration = urlService.server()+"/vibration";
                $scope.link.noti = urlService.server()+"/noti";
                $scope.link.gps = urlService.server()+"/gps";
                $scope.link.home = urlService.server()+"/";
            }

            // End Function

            // Start Directive
            $scope.invokes= {
            }
            // End Directive
            $scope.init();
        }]
    }
});
