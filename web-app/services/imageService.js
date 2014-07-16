/**
 * Created by lrollus on 7/14/14.
 */
angular.module("sampleApp")
    .constant("imageUrl", "/api/project/{id}/image.json")
    .factory("imageService",function($http,imageUrl,cytomineService) {

        var images=[];

        return {

            allImages : function() {
                return images;
            },

            getImageFromProject : function(idProject,callbackSuccess, callbackError) {
                $http.get(cytomineService.addKeys(imageUrl).replace("{id}",idProject))
                    .success(function (data) {
                        images = data;
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