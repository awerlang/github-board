function CockpitController(adminActions, adminMenu, adminUser, activeView) {
    var self = this;
    adminMenu.addMenu('Schedule', function (item) { 
        activeView.setActiveView("gb-schedule");
    });
    adminMenu.addMenu('Repositories', function (item) { 
        activeView.setActiveView("gb-repositories");
    });
    adminMenu.addMenu('Issues', function (item) { 
        activeView.setActiveView("gb-issues");
    });
    
    adminUser.setCurrentUser({
		img: 'http://cssnerd.com/wp-content/plugins/better-github-widget/octocat.png',
		name: 'Octocat',
		role: 'Web Wanderer',
		subtitle: 'Member since Nov. 2012',
        online: false,
        
        goToProfile: function () {
            console.log('profile');
        },
        signOut: function () {
            console.log('signout');
        }
	});
    self.getActiveView = function () {
        return activeView.getActiveViewName();
    };
    
    activeView.setActiveView("gb-dashboard");
}

angular.module('app', ['wt.admin', 'app.active-view', 'app.dashboard', 'app.repositories'])
    .controller('CockpitController', CockpitController)
    .config(function($provide) {
        $provide.decorator('$templateRequest', function($delegate) {
           return function (tpl, ignoreRequestError) {
               if (tpl.indexOf('.tpl.') >= 0) {
                   tpl = tpl.replace('/src/', '/bower_components/angular-admin-lite/src/');
               }
               return $delegate(tpl, ignoreRequestError);
           };
        });
    });
