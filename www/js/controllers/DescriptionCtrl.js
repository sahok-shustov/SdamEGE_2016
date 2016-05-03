ege.controller('DescriptionCtrl', ['$scope', '$rootScope', '$ionicBackdrop', '$ionicModal', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$stateParams',
    function($scope, $rootScope, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate, $stateParams) {

            $scope.backButtonName = " Назад";
        
        $scope.zoomMin = 1;

        $scope.showImages = function(index) {
            $scope.activeSlide = index;
            console.log("$scope.showImages --- index", index);
            $scope.showModal('templates/modals/gallery-zoomview.html');
        };

        $scope.showModal = function(templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
            //$scope.modal.remove();
        };

        $scope.updateSlideStatus = function(slide) {
            console.log("$scope.updateSlideStatus -- slide", slide);
            if (!$rootScope.paid && slide >= 4) {
                console.log("!$rootScope.paid && slide >= 4", slide);

                slide = 0;
                $scope.slide(slide);
            } else {
                var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
                if (zoomFactor == $scope.zoomMin) {
                    $ionicSlideBoxDelegate.enableSlide(true);
                } else {
                    $ionicSlideBoxDelegate.enableSlide(false);
                }
            }

        };

        $scope.updateCount = function(index) {
            $scope.position = index + 1;
            console.log("$scope.updateCount -- index", index);
            if (index > 4) {
                $scope.openPurchaseModalWindow();
            }
        };

        $scope.slide = function(to) {
            $scope.current = to;
            console.log("to", to);
            $ionicSlideBoxDelegate.slide(to);
        };

        $scope.slideChanged = function(slide) {
            if (!$rootScope.paid && slide >= 4) {
                slide = 0;
            } else {
                $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex();
                console.log('Active Slide=' + $scope.currentSlide);
                $scope.slide(slide);
            }

        };

        $scope.previousSlide = function() {
            if (!$rootScope.paid && $ionicSlideBoxDelegate.currentIndex() == 0) {
                $scope.currentSlide = 4;
                $scope.slide($scope.currentSlide);
            } else {
                $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex() - 1;
                $scope.slide($scope.currentSlide);
            }

        };

        $scope.nextSlide = function() {
            if (!$rootScope.paid && $ionicSlideBoxDelegate.currentIndex() >= 4) {
                $scope.currentSlide = 0;
                $scope.slide($scope.currentSlide);
            } else {
                $scope.currentSlide = $ionicSlideBoxDelegate.currentIndex() + 1;
                $scope.slide($scope.currentSlide);
            }

        };
    }
]);
