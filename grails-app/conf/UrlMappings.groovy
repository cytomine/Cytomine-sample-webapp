class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')

        "/api/welcome.$fomat"(controller:"main"){
            action = [GET: "welcome"]
        }

        "/api/project.$fomat"(controller:"cytomine"){
            action = [GET: "projects"]
        }
        "/api/project/$idProject/image.$fomat"(controller:"cytomine"){
            action = [GET: "images"]
        }
	}
}
