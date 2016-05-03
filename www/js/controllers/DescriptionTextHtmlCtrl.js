ege.controller('DescriptionTextHtmlCtrl', ['$scope', '$rootScope', '$stateParams', '$sce', '$timeout',
    function($scope, $rootScope, $stateParams, $sce, $timeout) {
        // $rootScope.material_images = [];
        // if (!$scope.materialsList) {
            $scope.showLoading();

            /*HttpService.getData('get_html_material/' + $stateParams.material_ID).then(function(ressponse) {
            $scope.material = ressponse.data;
            console.log("$scope.material", $scope.material);
            // console.log("$rootScope.material_image", $rootScope.material_images);

            }).finally(function() {
            $scope.hideLoading();
            });*/

            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.link = { src: 'https://unitest.tv/api/get_html_material/' + $stateParams.material_text_image_ID };
            // console.log("$scope.link_html", $scope.link_html);
        // };
        $timeout(function() {
            $scope.hideLoading();
        }, 2000);

        /*jQuery*/
        // $('#loadExternalURL').load('http://www.google.com');

        /*ajax*/
        // $.ajax({
        // dataType:'html',
        // url:'http://www.google.com',
        // success:function(data) {
        // $('#ajax').html($(data).children()); 
        // }
        // });

        /*window.open('https://unitest.tv/api/get_html_material/3529', '_blank', {
        location: 'no',
        clearcache: 'no',
        toolbar: 'no'
        });*/
    }
]);
