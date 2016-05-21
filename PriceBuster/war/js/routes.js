angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('menu.priceBuster', {
    url: '/pricebuster',
    views: {
      'home': {
        templateUrl: 'templates/priceBuster.html',
        controller: 'priceBusterCtrl'
      }
    }
  })

  .state('menu', {
    url: '/home',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.login', {
    url: '/login',
    views: {
      'home': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.signup', {
    url: '/signup',
    views: {
      'home': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

    .state('menu.new', {
    url: '/new',
    views: {
      'home': {
        templateUrl: 'templates/new.html',
        controller: 'newCtrl'
      }
    }
  })
  
  .state('menu.details', {
    url: '/details',
    views: {
      'home': {
        templateUrl: 'templates/details.html',
        controller: 'detailsCtrl'
      }
    }
  })

  .state('menu.api', {
    url: '/api',
    views: {
      'home': {
        templateUrl: 'templates/api.html',
        controller: 'priceBusterCtrl'
      }
    }
  })
  $urlRouterProvider.otherwise('/home/pricebuster')



});
