(function(angular) {
    /*
    This service stores the resource's configurations.
    it instantiates the resource required 
    by the hyResources Service for execution.
    */
    function ServiceFn($resource) {
        var resources = [];
        //Default Configuration Of a Resource
        function defaultConfig() {
            return {
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
                },
                "extra": {
                    defaultId: "id"
                }
            };
        }
        ///Add a new ressource in local storage
        function addResource(name, resource, config) {
            var obj = new defaultConfig();
            if (config) {
                obj = config;
            }
            obj.name = name;
            obj.resource = resource;
            resources.push(obj);
        }


        ///Removes a resource
        function removeResource(name) {
            var index = resourceIndex(name);
            if (index > -1) {
                resources.splice(index, 1);
            }
        }
        ///Finds a ressource
        function findResource(name) {
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].name == name) {
                    return resources[i];
                }
            }
        }
        ///Finds a ressource's Index
        function resourceIndex(name) {
            for (var i = 0; i < resources.length; i++) {
                if (resources[i].name == name) {
                    return i;
                }
            }
        }
        ///Returns a instance of a ressource with all the parameters
        function getResource(name) {
            var res = findResource(name);
            var resource = $resource(res.resource + "/:probablyneveruser", {
                "probablyneveruser": "@" + res.extra.defaultId
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
        //Getter and setter
        function configResource(name) {
            var res = findResource(name);
            var conf = {};
            conf.method = function(method) {
                var meth = {};
                meth.isArray = function(newValue) {
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
                };

                meth.addHeader = function(header, value) {
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
                };

                meth.removeHeader = function(header) {
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
                };
                return meth;
            };
            //Dedicace HDMI
            conf.changeUrl = function(URL) {
                removeResource(res.name);
                addResource(res.name, URL, res);
            };
            conf.defaultId = function(id) {
                removeResource(res.name);
                res.extra.defaultId = id;
                addResource(res.name, res.resource, res);
            };
            return conf;
        }

        function logListResources() {
            console.log(resources);
        }

        function logResource(name) {
            console.log(findResource(name));
        }
        //////////////////////////////////////////////////////////////////////////////
        ///////Public Methods
        //////////////////////////////////////////////////////////////////////////////

        /// Public addResource
        this.addResource = function(name, resource, config) {
            addResource(name, resource, config);
        };
        /// Public removeResource
        this.removeResource = function(name) {
            removeResource(name);
        };
        /// Public findResource
        this.findResource = function(name) {
            return findResource(name);
        };
        /// Public getResource
        this.getResource = function(name) {
            return getResource(name);
        };
        /// Public configResource
        this.configResource = function(name) {
            return configResource(name);
        };

        this.logListResources = function() {
            logListResources();
        }

        this.logResource = function(name) {
            logResource(name);
        }
    }
    ServiceFn.$inject = ['$resource'];
    angular.module('hyResources').service('hyResourceManager', ServiceFn);
})(angular);