angular.module('app.repositories', ['wt.admin', 'app.github'])
    .directive('gbRepositories', function (githubDefault) {
    return {
        templateUrl: 'repositories/index.html',
        controllerAs: 'ctrl',
        controller: function ($scope, $compile) {
            var self = this;
            
            self.userName = githubDefault.owner;
            githubDefault.getRepositories().then(function (data) {
                self.repositories = data;
            });
        }
    };
});