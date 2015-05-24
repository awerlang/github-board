angular.module('app.active-view', []).factory('activeView', function () {
	var activeViewName;
	var activeViewParam;
	function setActiveView(viewName, paramForView) {
		activeViewName = viewName;
		activeViewParam = paramForView;
	}
	function getActiveViewName() {
		return activeViewName;
	}
	function getActiveViewParam() {
		return activeViewParam;
	}
	return {
		setActiveView: setActiveView,
		getActiveViewName: getActiveViewName,
		getActiveViewParam: getActiveViewParam
	};
});
