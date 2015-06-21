var github_avoidRemote = true;
function github($http, $q) {
	function api(url) {
		if (github_avoidRemote) {
			var ghCache = localStorage.getItem(url);
			if (ghCache) {
				return $q.when(JSON.parse(ghCache));			
			}
		}
		
		return $http.get('https://api.github.com' + url).then(function (data) {
			localStorage.setItem(url, JSON.stringify(data.data));
			return data.data;
		});
	}
	return function(owner, repository) {
		function renderMarkdown(text) {
			if (!text) return $q.when("");
			
			if (github_avoidRemote) return $q.when(text);
			
			return $http.post('https://api.github.com/markdown/raw', text, {
				headers: {
					"Content-Type": "text/x-markdown"
				}
			}).then(function (data) {
				return data.data;
			});
		}
		function getRepositories(sort) {
			var params = sort ? '?sort=' + sort : '';
			return api('/users/' + owner + '/repos' + params);
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
