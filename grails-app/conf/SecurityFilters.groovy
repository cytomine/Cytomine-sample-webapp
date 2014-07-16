import be.cytomine.client.Cytomine

class SecurityFilters {
    def springSecurityService


    def filters = {

        api(uri:'/api/**') {
            before = {
                String publicKey = params.get("publicKey")
                String privateKey = params.get("privateKey")

                if(publicKey || privateKey) {
                    request['cytomine'] = new Cytomine(grailsApplication.config.grails.cytomine.host, publicKey, privateKey, "./");
                    request['cytomine'].setMax(0); //no max
                }
            }
            after = {

            }
            afterView = {

            }
        }
    }

}


