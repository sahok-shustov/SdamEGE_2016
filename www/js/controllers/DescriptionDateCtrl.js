ege.controller('DescriptionDateCtrl', ['$scope', '$rootScope', '$ionicModal', '$stateParams', 'HttpService',
    function($scope, $rootScope, $ionicModal, $stateParams, HttpService) {

            $rootScope.backButtonName =true;
        
        if (!$scope.materials_date) {
            $scope.showLoading();

            HttpService.getData('get_materials/' + $stateParams.materilsDate_ID).then(function(ressponse) {
                $scope.materials_date = ressponse.data;
                console.log("$scope.materials_date", $scope.materials_date);
                var temp

            }).finally(function() {
                $scope.hideLoading();
            });
        };

        $scope.search;
        $scope.clearSearch = function() {
            $scope.search = '';
        };

        $scope.updateDateView = function() {
            $scope.showLoading();

            HttpService.getData('get_materials/' + $stateParams.materilsDate_ID).then(function(ressponse) {
                $scope.materials_date = ressponse.data;
                console.log("$scope.materials_date", $scope.materials_date);
                var temp

            }).finally(function() {
                $scope.hideLoading();
            });
            $scope.$broadcast('scroll.refreshComplete');
        };
    }
]);
