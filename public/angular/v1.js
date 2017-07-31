// var app = angular.module("myApp", ["ngRoute"]);
// app.config(function($routeProvider, $locationProvider) {
var app = angular.module("myApp", ["ui.router", "viewhead"]);
app.config(function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  var page1 = {
    name: "page1",
    url: "/angular/v1.html",
    controller: "MainCtrl",
    template: "<title view-head>Page 1</title><meta view-head name='og:name' content='Angular 1 test'><div>Page 1 ui-view</div><view-title>Page 1</view-title>",
    data: {
      headerCssClassName: "page1"
    }
  };

  var page2 = {
    name: "page2",
    url: "/angular/v1-page2.html",
    controller: "MainCtrl",
    template: "<title view-head>Page 2</title><div>Page 2 ui-view</div>",
    data: {
      headerCssClassName: "page2"
    }
  };

  $stateProvider.state(page1);
  $stateProvider.state(page2);
});

app.controller("MainCtrl", function mainCtrl(
  $scope,
  $state,
  $location,
  $transitions
) {
  var that = this;
  $transitions.onSuccess({}, function() {
    if ($location.$$path === "/angular/v1.html") {
      that.headerCssClassName = "page1";
    } else if ($location.$$path === "/angular/v1-page2.html") {
      that.headerCssClassName = "page2";
    }
  });
});
