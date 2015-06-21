angular.module('app.repositories', ['ngSanitize', 'wt.admin', 'app.github', 'app.active-view'])
    .directive('gbRepositories', function (githubDefault, activeView) {
    return {
        templateUrl: 'repositories/index.html',
        controllerAs: 'ctrl',
        controller: function ($scope, $compile) {
            var self = this;
            
            self.userName = githubDefault.owner;
            githubDefault.getRepositories('pushed').then(function (data) {
                self.repositories = data;
            });
            self.openRepository = function (item) {
                activeView.setActiveView("gb-repository", item);
            };
        }
    };
});