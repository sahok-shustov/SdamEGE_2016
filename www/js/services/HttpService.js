/*
 * Service, that provide local storage for data
 */
ege.factory('HttpService', ['$http', function ($http) {
    return {

        getData: function (parameter) {
            return $http.get('https://unitest.tv/api/' + parameter).then(function(response){
                return response;
            });
        }
    }
}]);