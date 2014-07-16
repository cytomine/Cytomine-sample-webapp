package be.cytomine.sample

import grails.converters.JSON

class CytomineController {

    def grailsApplication

    def projects() {
        render request['cytomine'].getProjects().list as JSON
    }

    def images() {
        //request['cytomine'].setMax(5); //max 5 images
        def list = request['cytomine'].getImageInstances(params.long('idProject')).list
        list.each {
            //for each image, add a goToURL property containing the full URL to open the image in the "real" cytomine
            it.goToURL = grailsApplication.config.grails.cytomine.host + "/#tabs-image-" + params.long('idProject') + "-" + it.id + "-"
        }
        render list  as JSON
    }
}
