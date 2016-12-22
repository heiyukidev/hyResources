(function (angular) {
    'use strict';

    function runFn(hyResources) {
        //Initializing the local Storage for 
        localStorage.hyResources = JSON.stringify([]);
    }
    runFn.$inject = ['hyResources']
    angular.module("hyResources", ['ngResource']).run(runFn);


    function ServiceFn($resource) {
        //Default Configuration Of a Resource
        var defaultConfig = {
            "name": name,
            "resource": resource,
            "GetParams": {
                "HeaderContentType": "application/json",
                "Method": "GET",
                "IsArray": true
            },
            "AddParams": {
                "HeaderContentType": "application/json",
                "Method": "POST",
                "IsArray": false
            },
            "UpdateParams": {
                "HeaderContentType": "application/json",
                "Method": "PUT",
                "IsArray": false
            },
            "DeleteParams": {
                "HeaderContentType": "application/json",
                "Method": "DELETE",
                "IsArray": false
            }
        };
        ///Get All Ressources
        function getAll() {
            return JSON.parse(localStorage.hyResources);
        }
        ///Add a new ressource in local storage
        this.addResource = function (name, resource, config) {
            var resources = getAll();
            var obj = defaultConfig;
            if (config) {
                obj = config;
            }
            resources.push(obj);
            localStorage.hyResources = JSON.stringify(resources);
        };

        function removeResource(name) {
            var resources = getAll();
            var res = findResource(name);
            var index = resources.indexOf(res);
            if (index > -1) {
                array.splice(index, 1);
            }
        };
        ///Finds a ressource
        function findResource(name) {
            var resources = getAll();
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].name == name) {
                    return resources[i];
                }
            }
        };
        ///Returns a ressource with all the parameters
        function newRessource(name) {
            var res = findResource(name);
            var resource = $resource(res.resource + "/:id", {
                "id": "@id"
            }, {
                "get": {
                    "method": res.GetParams.Method,
                    "headers": {
                        "Content-Type": res.GetParams.HeaderContentType
                    },
                    "isArray": false
                },
                "query": {
                    "method": res.GetParams.Method,
                    "headers": {
                        "Content-Type": res.GetParams.HeaderContentType
                    },
                    "isArray": res.GetParams.IsArray
                },
                "save": {
                    "method": res.AddParams.Method,
                    "headers": {
                        "Content-Type": res.AddParams.HeaderContentType
                    },
                    "isArray": res.AddParams.IsArray
                },
                "update": {
                    "method": res.UpdateParams.Method,
                    "headers": {
                        "Content-Type": res.UpdateParams.HeaderContentType
                    },
                    "isArray": res.UpdateParams.IsArray
                },
                "delete": {
                    "method": res.DeleteParams.Method,
                    "headers": {
                        "Content-Type": res.DeleteParams.HeaderContentType
                    },
                    "isArray": res.DeleteParams.IsArray
                }

            });
            return resource;
        }
        ////Requests
        this.get = function (name, id) {
            var resource = newRessource(name);
            if (id) {
                return resource.get({
                    "id": id
                }).$promise;
            } else {
                return resource.query().$promise;
            }
        }
        this.add = function (name, entity) {
            var resource = newRessource(name);
            var persist = new resource(entity);
            return persist.$save();
        }
        this.update = function (name, entity) {
            var resource = newRessource(name);
            var persist = new resource(entity);
            return persist.$update();
        }
        this.delete = function (name, entity) {
            var resource = newRessource(name);
            var persist = new resource(entity);
            return persist.$remove();
        }

        //Getter and setter
        this.configResource = function (name) {
            this.method = function (method) {
                this.isArray = function (newValue) {
                    res = findResource(name);
                    removeResource(res);
                    if(method == 'get'){
                        GetParams.IsArray = newValue;
                    }
                    ServiceFn.addResource(res.name,res.resource,res);
                }
            }
        }

    }
    ServiceFn.$inject = ['$resource'];
    angular.module("hyResources").service("hyResources", ServiceFn);
})(angular);
