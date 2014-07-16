angular.module("sampleApp")
    .constant("welcomeUrl", "/api/welcome.json")
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })
    .controller("mainCtrl", function ($scope, $http, $route,$location,welcomeUrl,cytomineService) {
        console.log("mainCtrl");

        $scope.main = {error:{}};
        $scope.publicKey = (localStorage.getItem("publicKey")? localStorage.getItem("publicKey") : "");
        $scope.privateKey = (localStorage.getItem("privateKey")? localStorage.getItem("privateKey") : "");
        $scope.publicKeyCurrent = $scope.publicKey;
        $scope.privateKeyCurrent = $scope.privateKey;
        cytomineService.setKeys($scope.publicKey,$scope.privateKey);

        $scope.getWelcome = function() {
            $http.get(welcomeUrl)
                .success(function (data) {
                    console.log(data);
                    $scope.main.welcome = data;
                })
                .error(function (data, status, headers, config) {
                    $scope.main.error.retrieve = {status:status,message:data.errors};
                })
        };
        $scope.getWelcome();

        $scope.throwEx = function() {
            throw  { message: 'error occurred!' }
        }


        $scope.saveKeys = function() {
            localStorage.setItem("publicKey",$scope.publicKeyCurrent);
            localStorage.setItem("privateKey",$scope.privateKeyCurrent);
            $scope.publicKey = $scope.publicKeyCurrent;
            $scope.privateKey = $scope.privateKeyCurrent;
            cytomineService.setKeys($scope.publicKey,$scope.privateKey);
            window.location.reload();
        }


        $scope.changeKeys = function() {
            $scope.$broadcast('clearKeys', []);
        }

        $scope.$on('clearKeys', function(event, mass) {
            $scope.publicKey = "";
            $scope.privateKey = "";
            $scope.publicKeyCurrent = "";
            $scope.privateKeyCurrent = "";
            localStorage.removeItem("publicKey");
            localStorage.removeItem("privateKey");
        });
    });
