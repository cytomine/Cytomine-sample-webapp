angular.module("sampleApp", ["ngRoute","ngResource","ngTable"])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when("/home", {
            templateUrl: "views/projects.html"
        });
        $routeProvider.when("/project/:idProject/image", {
            templateUrl: "views/images.html"
        });
        $routeProvider.otherwise({
            templateUrl: "views/projects.html"
        });
    });
