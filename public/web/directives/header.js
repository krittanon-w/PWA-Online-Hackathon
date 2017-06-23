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
                profile: "",
            }
            // End Parameter

            // Start Function
            $scope.init = function(){
                $scope.link.profile = urlService.server()+"/profile";
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
