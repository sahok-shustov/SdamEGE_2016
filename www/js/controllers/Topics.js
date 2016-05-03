ege.controller('TopicsCtrl', ['$scope', '$rootScope', '$timeout', '$location', 'HttpService', '$stateParams', function($scope, $rootScope, $timeout, $location, HttpService, $stateParams) {
   
    $scope.checkToInet = function() {
        document.addEventListener("deviceready", function() {
            $scope.inet = $cordovaNetwork.getNetwork();
            $scope.isOnline = $cordovaNetwork.isOnline();
            $scope.isOffline = $cordovaNetwork.isOffline();

            if ($scope.isOffline) {
                // $rootScope.showAlertIsOffline();
                $scope.showLoading();
                $timeout(function() {
                    $scope.hideLoading();
                    $scope.showConfirmErrorInetTopics();
                }, 10000);
            };
            // listen for Online event
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                var onlineState = networkState;
            });
            // listen for Offline event
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                var offlineState = networkState;
            });
        }, false);
    };

    $timeout(function() {
        $scope.checkToInet();
    }, 100);

    // if (!$scope.categoriesList) {
        $scope.showLoading();

        HttpService.getData('get_categories/' + $stateParams.subject_ID).then(function(ressponse) {
            $scope.categoriesList = ressponse.data;
            console.log("$scope.categoriesList", $scope.categoriesList);
        }).finally(function() {
            $scope.hideLoading();
        });
    // }

    $scope.updateTopicsPage = function() {
        $scope.showLoading();

        HttpService.getData('get_categories/' + $stateParams.subject_ID).then(function(ressponse) {
            $scope.categoriesList = ressponse.data;

            console.log("$scope.categoriesList", $scope.categoriesList);

        }).finally(function() {
            $scope.hideLoading();
        });
        $scope.refreshComplete();
    };

    $scope.goToMaterialsORAdditionalTopics = function(category) {
        $rootScope.categoryName = category.cat_name;
        // $rootScope.sortingTypeMaterials = category.sorting;
        $rootScope.topicsPremium = category.premium;
        // console.log("$rootScope.sortingTypeMaterials", $rootScope.sortingTypeMaterials);

        switch (category.sorting) {
            case "title":
                $rootScope.sortingTypeMaterials = category.sorting;
                console.log("$rootScope.sortingTypeMaterials", $rootScope.sortingTypeMaterials);
                break;
            case "date":
                $rootScope.sortingTypeMaterials = "entry_date";
                console.log("$rootScope.sortingTypeMaterials", $rootScope.sortingTypeMaterials);
                break;
        };

        // $rootScope.premium = category.premium;
        if (category.cat_name == "Даты") {
            $location.path('/material_date/' + category.cat_id);
        } else if (category.has_content) {
            $location.path('/materials/' + category.cat_id);
        } else {
            $location.path('/additional_topics/' + category.cat_id);
        }
    };

    $scope.showConfirmErrorInetTopics = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Ошибка!',
            template: 'Нет подключения к интернету. Включите интернет и нажмите кнопку "Обновить"?',
            cancelText: 'Отмена',
            okText: 'Обновить'
        })
        confirmPopup.then(function(res) {
            if (res) {
                // console.log('You are sure');
                $scope.updateSubjects();
            } else {
                // console.log('You are not sure');
            }
        });
    };

}]);
