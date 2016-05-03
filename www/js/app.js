// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ege = angular.module('ege', ['ionic', 'ngCordova', 'ion-gallery'])

ege.run(function($ionicPlatform, $ionicLoading, $rootScope, $ionicModal, $ionicPopup, $localStorageService, $location, $window) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        if ((window.device && device.platform == "Android") && typeof inappbilling !== "undefined") {
            inappbilling.init(function(resultInit) {
                    $rootScope.resultInit = resultInit;
                    /*inappbilling.getPurchases(function(result) {
                            $rootScope.resultGetPurchases = result;
                            console.log("PURCHASE RESPONSE -> " + JSON.stringify(result));
                        },
                        function(errorPurchases) {
                            console.log("PURCHASE ERROR -> " + errorPurchases);
                        });*/

                    /*inappbilling.getAvailableProducts(function(result) {
                            $rootScope.availableProdResult = result;
                            console.log("PURCHASE RESPONSE -> " + JSON.stringify(result));
                            //                                $scope.showAlertAndroidAvailableProducts(result);
                        },
                        function(errorPurchases) {
                            console.log("PURCHASE ERROR -> " + errorPurchases);
                        });*/
                },
                function(errorInit) {
                    console.log("INITIALIZATION ERROR -> " + errorInit);
                }, { showLog: true }, ["content_ege_2016"]);
        };
    });
    var KEY = "Purchase_Content";
    var PAID = "Контент куплен!";


    $rootScope.buyContent = function() {
        // console.log("$scope.buyLevel -> ", index);
        var coincidence = false;

        inappbilling.getPurchases(function(result) {
                angular.forEach(result, function(val, key) {
                    if (val.productId == content_ege_2016) {
                        $rootScope.productId = val.productId;
                        coincidence = true;

                    }
                });
                // $rootScope.coincidence = coincidence;

                if (coincidence) {
                    // Сообщение, что контент уже приобритён, восстановить покупку?
                    $rootScope.showAlreadyPurchase();
                } else {
                    inappbilling.buy(function(data) {
                            if (data.purchaseState == 0) {
                                // Сообщение об успешной оплате
                                $rootScope.openPurchaseSuccessWindow();
                            }
                            // console.log("ITEM PURCHASED");
                        }, function(errorBuy) {
                            // console.log("ERROR BUYING -> " + errorBuy);
                        },
                        "content_ege_2016");
                }
            },
            function(errorPurchases) {
                $rootScope.resultGetPurchases = errorPurchases;
                // console.log("PURCHASE ERROR -> " + errorPurchases);
            });
    };

    /**
     * Show ionic loader
     */
    $rootScope.showLoading = function() {
        $ionicLoading.show({
                template: '<p>Загрузка...</p><ion-spinner icon="spiral"></ion-spinner>',
                showBackdrop: true,
                duration: 20000
            }
            /*{
    content: '<i class="icon ion-loading-c"></i>',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 50,
    showDelay: 0
  }*/
        );
    };

    /**
     * Hide ionic loader
     */
    $rootScope.hideLoading = function() {
        $ionicLoading.hide();
    };

    /**
     * Close pull loading
     */
    $rootScope.refreshComplete = function() {
        $rootScope.$broadcast('scroll.refreshComplete');
    };


    $ionicModal.fromTemplateUrl('templates/modals/modalPurchase.html', {
        scope: $rootScope
    }).then(function(modal) {
        $rootScope.modalPurchase = modal;
    });

    $rootScope.openPurchaseModalWindow = function() {
        $rootScope.modalPurchase.show();
    };

    $rootScope.closePurchaseModalWindow = function() {
        $rootScope.modalPurchase.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modals/purchaseSuccess.html', {
        scope: $rootScope
    }).then(function(modal) {
        $rootScope.modalPurchaseSuccess = modal;
    });

    $rootScope.openPurchaseSuccessWindow = function() {
        $rootScope.modalPurchaseSuccess.show();
    };

    $rootScope.closePurchaseSuccessWindow = function() {
        $rootScope.modalPurchaseSuccess.hide();
    };

    $rootScope.showAlreadyPurchase = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Покупка',
            template: 'Контент был приобретён ранее, хотите восстановить покупку?',
            cancelText: 'Отмена',
            okText: 'Да'
        })
        confirmPopup.then(function(res) {
            if (res) {
                // console.log('You are sure');
                $rootScope.addToLocalStorage();
                $location.path('/subjects');
                $window.location.reload();

            } else {
                // console.log('You are not sure');
            }
        });
    };

    $rootScope.showConfirmReestablishPurchase = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Покупка',
            template: 'Запись найдена, хотите восстановить покупку?',
            cancelText: 'Отмена',
            okText: 'Да'
        })
        confirmPopup.then(function(res) {
            if (res) {
                // console.log('You are sure');
                $rootScope.addToLocalStorage();
                $location.path('/subjects');
                $window.location.reload();

            } else {
                // console.log('You are not sure');
            }
        });
    };

    $rootScope.showAlertErrorPurchase = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Покупка не найдена!'
        });
    };

    $rootScope.addToLocalStorage = function() {
        $localStorageService.set(KEY, PAID);
        $location.path('/subjects');
        $window.location.reload();
    };

    $rootScope.delToLocalStorage = function() {
        $localStorageService.remove(KEY);
        $location.path('/subjects');
        $window.location.reload();
    };

    $rootScope.reestablishPurchase = function() {
        var reestablish = false;
        inappbilling.getPurchases(function(result) {
                angular.forEach(result, function(val, key) {
                    if (val.productId == "content_ege_2016") {
                        // $rootScope.productId = val.productId;
                        reestablish = true;
                    }
                });
                // $rootScope.coincidence = coincidence;

                if (reestablish) {
                    // Сообщение, что контент уже приобритён, восстановить покупку?
                    $rootScope.showConfirmReestablishPurchase();
                } else {
                    $rootScope.showAlertErrorPurchase();
                }
            },
            function(errorPurchases) {
                $rootScope.resultGetPurchases = errorPurchases;
                // console.log("PURCHASE ERROR -> " + errorPurchases);
            });
    };

});
