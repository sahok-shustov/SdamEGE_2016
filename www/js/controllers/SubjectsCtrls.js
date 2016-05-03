ege.controller('SubjectsCtrl', ['$scope', '$http', 'HttpService', '$cordovaDevice', '$timeout', '$rootScope', '$location', '$ionicModal', '$localStorageService', '$cordovaNetwork', '$ionicPopup',
    function($scope, $http, HttpService, $cordovaDevice, $timeout, $rootScope, $location, $ionicModal, $localStorageService, $cordovaNetwork, $ionicPopup) {

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
                        $scope.showConfirmErrorInetSubjects();
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

        var dateNow = new Date();
        // var dateCrash = new Date('May 12, 2016');
        var dateCrash = new Date('May 13 2016');
        console.log("dateNow", dateNow);
        console.log("dateCrash", dateCrash);

        var key = "Purchase_Content";
        // var dataPurchase = ;
        if ($localStorageService.get(key)) {
            console.log("$localStorageService.get(key)", $localStorageService.get(key));
            // Open sabjects to visible
            $rootScope.paid = true;
        } else {
            $rootScope.paid = false;
        };
        console.log("$rootScope.paid", $rootScope.paid);

        $timeout(function() {
            $scope.checkToInet();
        }, 100);

        console.log($scope.subjects);
        if (dateNow <= dateCrash) {
            $scope.showLoading();

            $scope.subjectsEmpty = [];
            $scope.subjects = [];

            HttpService.getData('get_categories/0').then(function(ressponse) {
                    // console.log("get_categories/0", ressponse.data);
                angular.forEach(ressponse.data, function(value, key) {
                    // console.log("value.cat_url_title", value.cat_url_title);
                    switch (value.cat_url_title) {
                        case "informatics":
                            value.color = "#56b0b5";
                            value.colorBorder = "rgba(86,176,181,.9)";
                            break;
                        case "history":
                            value.color = "#0071c2";
                            value.colorBorder = "rgba(0,113,194,.8)";
                            break;
                        case "russian":
                            value.color = "#e04592";
                            value.colorBorder = "rgba(224,69,146,.8)";
                            break;
                        case "english":
                            value.color = "#ba45b5";
                            value.colorBorder = "rgba(186,69,181,.8)";
                            break;
                        case "social":
                            value.color = "#00b81f";
                            value.colorBorder = "rgba(0,184,31,.8)";
                            break;
                        case "physics":
                            value.color = "#ffD35C";
                            value.colorBorder = "rgba(255,211,92,.8)";
                            break;
                        case "geographics":
                            value.color = "#ff5151";
                            value.colorBorder = "rgba(255,81,81,.8)";
                            break;
                        case "composition":
                            value.color = "#f46182";
                            value.colorBorder = "rgba(244,97,130,.8)";
                            break;
                        case "literature":
                            value.color = "#35a776";
                            value.colorBorder = "rgba(53,167,118,.8)";
                            break;
                        case "biology":
                            value.color = "#82b526";
                            value.colorBorder = "rgba(130,181,38,.8)";
                            break;
                        case "chemistry":
                            value.color = "#8b75e9";
                            value.colorBorder = "rgba(139,117,233,.8)";
                            break;
                        case "math":
                            value.color = "#ff5151";
                            value.colorBorder = "rgba(255,81,81,.8)";
                            break;
                        default:
                            value.color = "#d3d3d3";
                            value.colorBorder = "rgba(211,211,211,.8)";
                    }

                    if (value.in_development) {
                        $scope.subjectsEmpty.push(value);
                    } else {
                        $scope.subjects.push(value);
                    }
                });

                console.log("$scope.subjects", $scope.subjects);
                console.log("$scope.subjectsEmpty", $scope.subjectsEmpty);


            }).finally(function() {
                $scope.hideLoading();
            });
        }

        $scope.goToTopics = function(selectedSubject) {
            $rootScope.selectedSubjectName = selectedSubject.cat_name;
            // console.log("selectedSubject", selectedSubject);
            if (selectedSubject.in_development) {
                console.log("selectedSubject.in_development", selectedSubject.in_development);
            } else {
                $location.path('/topics/' + selectedSubject.cat_id);
            }
        };

        $scope.showConfirmErrorInetSubjects = function() {
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

        $scope.updateSubjects = function() {
            var key = "Purchase_Content";
            // var dataPurchase = ;
            if ($localStorageService.get(key)) {
                console.log("$localStorageService.get(key)", $localStorageService.get(key));
                // Open sabjects to visible
                $rootScope.paid = true;
            } else {
                $rootScope.paid = false;
            };
            console.log("$rootScope.paid", $rootScope.paid);

            $timeout(function() {
                $scope.checkToInet();
            }, 100);

            // console.log($scope.subjects);
            $scope.showLoading();

            /*var subjectsEmpty = [];
            var temp = [];*/
            $scope.subjectsEmpty = [];
            $scope.subjects = [];

            HttpService.getData('get_categories/0').then(function(ressponse) {
                angular.forEach(ressponse.data, function(value, key) {
                    // console.log("value.cat_url_title", value.cat_url_title);
                    switch (value.cat_url_title) {
                        case "informatics":
                            value.color = "#56b0b5";
                            value.colorBorder = "rgba(86,176,181,.9)";
                            break;
                        case "history":
                            value.color = "#0071c2";
                            value.colorBorder = "rgba(0,113,194,.8)";
                            break;
                        case "russian":
                            value.color = "#e04592";
                            value.colorBorder = "rgba(224,69,146,.8)";
                            break;
                        case "english":
                            value.color = "#ba45b5";
                            value.colorBorder = "rgba(186,69,181,.8)";
                            break;
                        case "social":
                            value.color = "#00b81f";
                            value.colorBorder = "rgba(0,184,31,.8)";
                            break;
                        case "physics":
                            value.color = "#ffD35C";
                            value.colorBorder = "rgba(255,211,92,.8)";
                            break;
                        case "geographics":
                            value.color = "#ff5151";
                            value.colorBorder = "rgba(255,81,81,.8)";
                            break;
                        case "composition":
                            value.color = "#f46182";
                            value.colorBorder = "rgba(244,97,130,.8)";
                            break;
                        case "literature":
                            value.color = "#35a776";
                            value.colorBorder = "rgba(53,167,118,.8)";
                            break;
                        case "biology":
                            value.color = "#82b526";
                            value.colorBorder = "rgba(130,181,38,.8)";
                            break;
                        case "chemistry":
                            value.color = "#8b75e9";
                            value.colorBorder = "rgba(139,117,233,.8)";
                            break;
                        case "math":
                            value.color = "#ff5151";
                            value.colorBorder = "rgba(255,81,81,.8)";
                            break;
                        default:
                            value.color = "#d3d3d3";
                            value.colorBorder = "rgba(211,211,211,.8)";
                    };

                    if (value.in_development) {
                        $scope.subjectsEmpty.push(value);
                    } else {
                        $scope.subjects.push(value);
                    }
                });
                console.log("$scope.subjects", $scope.subjects);
            }).finally(function() {
                $scope.hideLoading();
            });
        }
    }
]);
