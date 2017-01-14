(function(angular) {
    'use strict';

    function ServiceFn(hyResourceManager, $http) {
      
        ////GET Requests
        this.get = function(name, params) {
            var resource = hyResourceManager.getResource(name);
            
            if (params) {
                return resource.get({
                    "probablyneveruser": params
                }).$promise;
            } else {
                return resource.query().$promise;
            }
        };
        
        ////POST Requests
        this.add = function(name, entity) {
            var resource = hyResourceManager.getResource(name);
            var persist = new resource(entity);
            return persist.$save();
        };
        
        ////PUT Requests
        this.update = function(name, entity) {
            var resource = hyResourceManager.getResource(name);
            var persist = new resource(entity);
            return persist.$update();
        };
        ////DELETE Requests
        this.delete = function(name, entity) {
            var resource = hyResourceManager.findResource(name);
            var urlRes = resource.resource;
            if (entity[resource.extra.defaultId]) {
                urlRes = urlRes + "/" + entity[resource.extra.defaultId];
            }
            var req = {
                method: resource.DeleteParams.Method,
                url: urlRes,
                headers: resource.DeleteParams.headers,
                data: entity
            };
            return $http(req);

        };
    }
    ServiceFn.$inject = ['hyResourceManager', '$http'];
    angular.module("hyResources").service("hyRequests", ServiceFn);
})(angular);