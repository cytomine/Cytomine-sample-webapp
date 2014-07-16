angular.module("sampleApp")
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })
    .controller("imageCtrl", function ($scope, $http,$filter, $location,imageService,$routeParams) {
        console.log("imageCtrl");

        $scope.image = {error:{}};
        $scope.idProject = $routeParams["idProject"];

        $scope.getImages = function(idProject,callbackSuccess) {
            imageService.getImageFromProject(
                idProject,
                function(data) {
                    callbackSuccess(data);
                },
                function(data, status) {
                    $scope.image.error.retrieve = {status:status,message:data.errors};
                    $scope.loading = false;
                }
            );
        };

        $scope.loading = true;
        $scope.getImages(
            $scope.idProject,
            function(data) {
                $scope.image.error.retrieve = null;
                $scope.image.images = data;
                $scope.data = data;
                $scope.loading = false;
            });

    });
