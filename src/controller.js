function TestController(adminActions, adminMenu, adminUser) {
    adminMenu.addMenu('Schedule', function (item) { console.log(item.text);});
    adminMenu.addMenu('Repositories', function (item) { console.log(item.text);});
    adminMenu.addMenu('Issues', function (item) { console.log(item.text);});
    
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
}

angular.module('app', ['wt.admin', 'app.dashboard'])
    .controller('AppController', TestController)
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
