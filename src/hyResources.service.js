(function(angular) {
    function ServiceFn(hyResourceManager, hyRequests) {
        //////////////////////////////////////////////////////////////////////////////
        ///////Public Methods
        //////////////////////////////////////////////////////////////////////////////

        /// Public addResource
        this.addResource = function(name, resource, config) {
            hyResourceManager.addResource(name, resource, config);
        };
        /// Public removeResource
        this.removeResource = function(name) {
            hyResourceManager.removeResource(name);
        };
        // Public configResource
        this.configResource = function(name){
          return hyResourceManager.configResource(name);
        };
        // List Resources (DEV)
        this.logListResources = function(){
          hyResourceManager.logListResources();
        };
        // List Resources (DEV)
        this.logResource = function(name){
          hyResourceManager.logResource(name);
        };
        /// Public Get Request
        this.get = function(name, params) {
            return hyRequests.get(name, params);
        };
        /// Public Post Request
        this.add = function(name, object) {
            return hyRequests.add(name, object);
        };
        /// Public Put Request
        this.update = function(name, object) {
            return hyRequests.update(name, object);
        };
        /// Public Delete Request
        this.delete = function(name, object) {
            return hyRequests.delete(name, object);
        };

    }
    ServiceFn.$inject = ['hyResourceManager', 'hyRequests'];
    angular.module('hyResources').service('hyResources', ServiceFn);
})(angular);