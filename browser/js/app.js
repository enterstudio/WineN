'use strict';
var app = angular.module('WineNApp', ['ui.router', 'fsaPreBuilt', 'ngAnimate', 'LocalStorageModule', 'ui.bootstrap', 'angular-stripe']);

app.config(function ($urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
    $uiViewScrollProvider.useAnchorScroll();
});

app.config(function (localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('WineNApp');
});

app.config(function (stripeProvider) {
    stripeProvider.setPublishableKey('PUBLICKEY');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };
    var destinationStateRequiresAdmin = function (state) {
      return state.data.admin;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated() && !destinationStateRequiresAdmin(toState)) {
          // The user is authenticated and page doesn't require an admin.
          // Short circuit with return.
          return;
        } //if accessing a page that requires auth, and doesn't require admin rights, short circuit

        if (destinationStateRequiresAdmin(toState)) {
          if (AuthService.isAdmin()){
            return;
          }
        }
       event.preventDefault();



      AuthService.getLoggedInUser().then(function (user) {
        // If a user is retrieved, then renavigate to the destination
        // (the second time, AuthService.isAuthenticated() will work)
        // otherwise, if no user is logged in, go to "login" state.

        if (user) {
          if (destinationStateRequiresAdmin(toState)){
            console.log('user data ', user);
            if (user.role === 'admin') {
              $state.go(toState.name, toParams);
            } else {
              console.log('not authorized');
              $state.go('profile');
            }
          }
          else {
            $state.go(toState.name, toParams);
          } //
        } else {
          $state.go('login');
        }
      });








        // Cancel navigating to new state.




    });

});