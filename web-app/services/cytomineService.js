/**
 * Created by lrollus on 7/14/14.
 */
angular.module("sampleApp")
    .factory("cytomineService",function($http,projectUrl) {

        var publicKey;
        var privateKey;

        return {

            getPublicKey : function() {
                return publicKey;
            },
            getPrivateKey : function() {
                return privateKey;
            },

            setKeys : function(publicK,privateK) {
                console.log("set key="+publicK + " " + privateK);
                publicKey = publicK;
                privateKey = privateK;
            },

            addKeys : function(url) {
                url = url + ((url.indexOf("?")==-1)? "?" : "&");
                url = url + "publicKey={publicKey}&privateKey={privateKey}";
                url = url.replace("{publicKey}",this.getPublicKey());
                url = url.replace("{privateKey}",this.getPrivateKey());
                return url;
            }
        };
    });
