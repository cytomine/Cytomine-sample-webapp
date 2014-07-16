/**
 * Created by lrollus on 7/14/14.
 */
angular.module("sampleApp")
    .constant("projectUrl", "/api/project.json")
    .factory("projectService",function($http,projectUrl,cytomineService) {
/*
 static String publickey = "29f51819-3dc6-468c-8aa7-9c81b9bc236b";
 static String privatekey = "db214699-0384-498c-823f-801654238a67";

 */
        var projects=[];

        return {

            allProjects : function() {
                return projects;
            },

            getAllProjects : function(callbackSuccess, callbackError) {
                if(projects.length==0) {
                    this.refreshAllProjects(callbackSuccess,callbackError);
                } else {
                    callbackSuccess(projects);
                }
            },

            refreshAllProjects : function(callbackSuccess, callbackError) {
                $http.get(cytomineService.addKeys(projectUrl))
                    .success(function (data) {
                        projects = data;
                        if(callbackSuccess) {
                            callbackSuccess(data);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        if(callbackError) {
                            callbackError(data,status);
                        }
                    })
            }
        };
    });