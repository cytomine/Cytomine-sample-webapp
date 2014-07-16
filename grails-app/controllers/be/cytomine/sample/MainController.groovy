package be.cytomine.sample

class MainController {

    def grailsApplication

    def welcome() {
        render "Welcome in ${grailsApplication.metadata.'app.name'} (${grailsApplication.metadata.'app.version'})"
    }
}
