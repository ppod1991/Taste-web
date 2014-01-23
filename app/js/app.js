'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('fantasyApp',
  [ 'fantasyApp.config'
  , 'fantasyApp.controllers.header'
  , 'fantasyApp.controllers.signin'
  , 'fantasyApp.controllers.signup'
  , 'fantasyApp.controllers.nfl'
  , 'fantasyApp.controllers.leagues'
  , 'fantasyApp.controllers.players'
  , 'fantasyApp.controllers.fantasyTeams'
  , 'fantasyApp.controllers.feed'
  , 'fantasyApp.controllers.snaps'
  , 'fantasyApp.controllers.fans'
  , 'firebase', 'ui.bootstrap', 'ngRoute']
  )
