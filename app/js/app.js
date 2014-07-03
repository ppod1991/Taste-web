'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('fantasyApp',
  [ 'fantasyApp.config'
  , 'fantasyApp.controllers.header'
  , 'fantasyApp.controllers.signin'
  , 'fantasyApp.controllers.feed'
  , 'fantasyApp.controllers.snaps'
  , 'fantasyApp.controllers.fans'
  , 'fantasyApp.controllers.userTest'
  , 'fantasyApp.controllers.place'
  , 'firebase', 'ui.bootstrap', 'ngRoute','ngAnimate']
  );

