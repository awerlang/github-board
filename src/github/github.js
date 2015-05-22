function github($http) {
	function api(url){
		return $http.get('https://api.github.com' + url).then(function (data) {
			return data.data;
		});
	}
	return function(owner, repository) {
		function getRepositories() {
			return api('/users/' + owner + '/repos');
		}
		function getIssues() {
			return api('/repos/' + owner + '/' + repository + '/issues');
		}
		function getMilestones() {
			return api('/repos/' + owner + '/' + repository + '/milestones');
		}
		return {
			owner: owner,
			repository: repository,
			
			getRepositories: getRepositories,
			getMilestones: getMilestones,
			getIssues: getIssues
		};
	};
}

angular.module('app.github', [])
	.factory('github', github)
	.factory('githubDefault', function (github) {
		return github('awerlang', 'angular-admin-lite');
	});
