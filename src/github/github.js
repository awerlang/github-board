function github($http) {
	function api(url){
		return $http.get('https://api.github.com' + url).then(function (data) {
			return data.data;
		});
	}
	return function(owner, repository) {
		function renderMarkdown(text) {
			return $http.post('https://api.github.com/markdown/raw', text, {
				headers: {
					"Content-Type": "text/x-markdown"
				}
			}).then(function (data) {
				return data.data;
			});
		}
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

			renderMarkdown: renderMarkdown,
			
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
