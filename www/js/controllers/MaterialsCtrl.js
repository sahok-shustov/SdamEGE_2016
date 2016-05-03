ege.controller('MaterialsCtrl', ['$scope', '$rootScope', '$timeout', 'HttpService', '$ionicScrollDelegate', 'filterFilter', '$location', '$anchorScroll', '$stateParams',
    function($scope, $rootScope, $timeout, HttpService, $ionicScrollDelegate, filterFilter, $location, $anchorScroll, $stateParams) {

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
                        $scope.showConfirmErrorInetMaterials();
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

        $rootScope.material_images = [];

        $scope.addNewMaterialsList = function(material) {
            $rootScope.material_images.push(material.material_image);
            // console.log("$rootScope.material_images -- $scope.addNewMaterialsList", $rootScope.material_images);
        };

        if (!$scope.materialsList) {
            $scope.showLoading();

            HttpService.getData('get_materials/' + $stateParams.topic_ID).then(function(ressponse) {
                $scope.materialsList = ressponse.data;
                console.log("$scope.materialsList -- HttpService.getData", $scope.materialsList);
            }).finally(function() {
                $scope.hideLoading();
            });
        }


        $scope.search;
        $scope.clearSearch = function() {
            $scope.search = '';
        };

        $scope.goToMaterialTypePage = function(index, selectedMaterial) {
            // console.log("selectedSubject", selectedSubject);
            // console.log("index", index);
            if ($rootScope.paid || !$rootScope.topicsPremium) {
                $rootScope.indexPosition = index;
                $rootScope.material = selectedMaterial;
                switch (selectedMaterial.material_type) {
                    case "image":
                        $location.path('/material_image');
                        break;
                    case "text_image":
                        $location.path('/material_text_image');
                    $rootScope.material.material_text = $rootScope.material.material_text.replace(/(\r\n|\n|\r)/gm, "<br>");
            // console.log("$location.path('/material_text_image/' + selectedMaterial.material_text", $rootScope.material.material_text);
                        break;
                    case "text":
                        $location.path('/material_text');
                        break;
                    case "html":
                        $location.path('/material_html/' + selectedMaterial.entry_id);
                        break;
                };
            } else {
                $rootScope.indexPosition = index;
                if (index > 4) {
                    $scope.openPurchaseModalWindow();
                } else {
                    $rootScope.material = selectedMaterial;
                    switch (selectedMaterial.material_type) {
                        case "image":
                            $location.path('/material_image');
                            break;
                        case "text_image":
                            $location.path('/material_text_image');
                    $rootScope.material.material_text = $rootScope.material.material_text.replace(/(\r\n|\n|\r)/gm, "<br>");
            // console.log("$location.path('/material_text_image/' + selectedMaterial.material_text", $rootScope.material.material_text);
                            break;
                        case "text":
                            $location.path('/material_text');
                            break;
                        case "html":
                            $location.path('/material_html/' + selectedMaterial.entry_id);
                            break;
                    };
                };
            }
        };

        $scope.updateMaterialsView = function() {
            $scope.showLoading();
            $rootScope.material_images = [];

            HttpService.getData('get_materials/' + $stateParams.topic_ID).then(function(ressponse) {
                $scope.materialsList = ressponse.data;
                console.log("$scope.materialsList", $scope.materialsList);
            }).finally(function() {
                $scope.hideLoading();
            });
            $scope.refreshComplete();

        };

        $scope.showConfirmErrorInetMaterials = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Ошибка!',
                template: 'Нет подключения к интернету. Включите интернет и нажмите кнопку "Обновить"?',
                cancelText: 'Отмена',
                okText: 'Обновить'
            })
            confirmPopup.then(function(res) {
                if (res) {
                    // console.log('You are sure');
                    $scope.updateMaterialsView();
                } else {
                    // console.log('You are not sure');
                }
            });
        };
    }
]);
