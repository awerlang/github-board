angular.module('app.repositories')
    .directive('gbRepository', function (github, activeView) {
    return {
        templateUrl: 'repository/index.html',
        controllerAs: 'ctrl',
        controller: function ($scope, $compile) {
            var self = this;
            
            self.currentRepository = activeView.getActiveViewParam();
            var repository = github(self.currentRepository.owner.login, self.currentRepository.name);
            repository.getMilestones().then(function (data) {
                self.milestones = data;
                angular.forEach(self.milestones, function (item) {
                    repository.renderMarkdown(item.description).then(function (result) {
                        item.description = result;
                    });
                });
            });
            repository.getIssues().then(function (data) {
                self.issues = data;
            });
        }
    };
});
