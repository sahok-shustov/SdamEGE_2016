/*
 * Service, that provide local storage for data
 */
ege.factory('$localStorageService', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
            /*window.localStorage['userData'] = angular.toJson($scope.userData);
                        $rootScope.userData = JSON.parse(window.localStorage['userData']);*/
        },
        get: function (key) {
            return $window.localStorage[key];
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        },
        remove: function (key) {
            delete $window.localStorage[key];
        }
    }
}]);