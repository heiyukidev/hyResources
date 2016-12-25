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
            "GetParams": {
                "headers": {
                    "Content-Type": "application/json"
                },
                "Method": "GET",
                "IsArray": true
            },
            "AddParams": {
                "headers": {
                    "Content-Type": "application/json"
                },
                "Method": "POST",
                "IsArray": false
            },
            "UpdateParams": {
                "headers": {
                    "Content-Type": "application/json"
                },
                "Method": "PUT",
                "IsArray": false
            },
            "DeleteParams": {
                "headers": {
                    "Content-Type": "application/json"
                },
                "Method": "DELETE",
                "IsArray": false
            }
        };
        ///Get All Ressources
        function getAll() {
            return JSON.parse(localStorage.hyResources);
        }
        ///Add a new ressource in local storage
        function addResource(name, resource, config) {
            var resources = getAll();
            var obj = defaultConfig;
            if (config) {
                obj = config;
            }
            obj.name = name;
            obj.resource = resource;
            resources.push(obj);
            localStorage.hyResources = JSON.stringify(resources);
        };
        /// Public Add
        this.addResource = function (name, resource, config) {
            addResource(name, resource, config);
        }

        ///Removes a resource
        function removeResource(name) {
            var resources = getAll();
            var index = resourceIndex(name);
            if (index > -1) {
                resources.splice(index, 1);
            }
            localStorage.hyResources = JSON.stringify(resources);
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
        ///Finds a ressource's Index
        function resourceIndex(name) {
            var resources = getAll();
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].name == name) {
                    return i;
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
                    "headers": res.GetParams.headers,
                    "isArray": false
                },
                "query": {
                    "method": res.GetParams.Method,
                    "headers": res.GetParams.headers,
                    "isArray": res.GetParams.IsArray
                },
                "save": {
                    "method": res.AddParams.Method,
                    "headers": res.AddParams.headers,
                    "isArray": res.AddParams.IsArray
                },
                "update": {
                    "method": res.UpdateParams.Method,
                    "headers": res.UpdateParams.headers,
                    "isArray": res.UpdateParams.IsArray
                },
                "delete": {
                    "method": res.DeleteParams.Method,
                    "headers": res.DeleteParams.headers,
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
            var res = findResource(name);
            var conf = {};
            conf.method = function (method) {
                var meth = {};
                meth.isArray = function (newValue) {
                    removeResource(res.name);
                    if (method == 'get') {
                        res.GetParams.IsArray = newValue;
                    }
                    if (method == 'add') {
                        res.AddParams.IsArray = newValue;
                    }
                    if (method == 'update') {
                        res.UpdateParams.IsArray = newValue;
                    }
                    if (method == 'delete') {
                        res.DeleteParams.IsArray = newValue;
                    }
                    addResource(res.name, res.resource, res);
                }

                meth.addHeader = function (header, value) {
                    removeResource(res.name);
                    if (method == 'get') {
                        res.GetParams.headers[header] = value;
                    }
                    if (method == 'add') {
                        res.AddParams.headers[header] = value;
                    }
                    if (method == 'update') {
                        res.UpdateParams.headers[header] = value;
                    }
                    if (method == 'delete') {
                        res.DeleteParams.headers[header] = value;
                    }
                    addResource(res.name, res.resource, res);
                }
                meth.removeHeader = function (header) {
                    removeResource(res.name);
                    if (method == 'get') {
                        delete res.GetParams.headers[header];
                    }
                    if (method == 'add') {
                        delete res.AddParams.headers[header];
                    }
                    if (method == 'update') {
                        delete res.UpdateParams.headers[header];
                    }
                    if (method == 'delete') {
                        delete res.DeleteParams.headers[header];
                    }
                    addResource(res.name, res.resource, res);
                }
                return meth;
            }
            return conf;
        }

    }
    ServiceFn.$inject = ['$resource'];
    angular.module("hyResources").service("hyResources", ServiceFn);
})(angular);
