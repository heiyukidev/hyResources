(function(angular){
    function runFn($hyResources){
        //Initializing the local Storage for 
        localStorage.hyResources = JSON.stringify([]);
    }
    runFn.$inject = ['$hyResources']
    angular.module("hyResources",['ngResource']).run(runFn);
})(angular);