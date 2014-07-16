angular.module("sampleApp")
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })
    .controller("projectCtrl", function ($scope, $http,$filter, $location,projectService,ngTableParams) {
        console.log("projectCtrl");

        $scope.project = {error:{}};

        $scope.getAllProjects = function(callbackSuccess) {
            projectService.getAllProjects(
                function(data) {
                    callbackSuccess(data);
                },
                function(data, status) {
                    $scope.project.error.retrieve = {status:status,message:data.errors};
                }
            );
        };

        $scope.loading = true;
        $scope.getAllProjects(
            function(data) {
                $scope.project.error.retrieve = null;
                $scope.project.projects = data;

                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10 ,          // count per page
                    sorting: {
                        name: 'asc'     // initial sorting
                    },
                    filter: {
                        name: ''       // initial filter
                    }
                }, {
                    total: $scope.project.projects.length, // length of data
                    getData: function($defer, params) {
                        // use build-in angular filter
                        var newData = $scope.project.projects;
                        // use build-in angular filter
                        newData = params.filter() ?$filter('filter')(newData, params.filter()) : newData;
                        newData = params.sorting() ? $filter('orderBy')(newData, params.orderBy()) : newData;
                        $scope.data = newData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        params.total(newData.length); // set total for recalc pagination
                        $defer.resolve($scope.data);
                        $scope.loading = false;
                    }
                });

            });

    });
