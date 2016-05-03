ege.directive('multitouch', function () {
    return function(scope, element, attr) {
        element.on('touchstart', function() {
            scope.$apply(function() {
                scope.$eval(attr.multitouch);
            });
        });
    };
});