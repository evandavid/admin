'use strict';

/**
 * @ngdoc overview
 * @name simplefiAdminApp
 * @description
 * # simplefiAdminApp
 *
 * Main module of the application.
 */
angular
  .module('simplefiAdminApp.global.directives', [])
  .directive('menuSidebar', function () {
    return {
    	restrict: 'A',
    	link: function(scope, elem){
    		elem.bind('click', function(){
    			jQuery('.sidebar').toggleClass('iconic');
    		})
    	}
    };
  });
