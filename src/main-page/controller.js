angular.module('app.dashboard', ['wt.admin', 'ui.calendar'])
    .directive('gbDashboard', function () {
    return {
        templateUrl: 'main-page/index.html',
        controllerAs: 'ctrl',
        controller: function ($scope, $compile) {
            var eventRender = function (event, element, view) {
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)($scope);
            };

            this.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    header: {
                        left: 'title',
                        center: '',
                        right: 'today prev,next'
                    },
                    eventRender: eventRender
                }
            };

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            this.eventSources = [[
                { title: 'All Day Event', start: new Date(y, m, 1) },
                { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
                { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
                { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
                { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
                { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://localhost/' }
            ]];
        }
    };
});