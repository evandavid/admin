'use strict';

/**
 * @ngdoc function
 * @name simplefiAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the simplefiAdminApp
 */
angular.module('simplefiAdminApp')
  .controller('ApplicationSearchCtrl', function () {
    var vm = this;

    vm.applicationType = [{
    	id: null,
    	name: 'Application Status'
    },{
    	id: 1,
    	name: 'In Progress'
    },{
    	id: 2,
    	name: 'Ineligible'
    }];

    vm.usersList = [{
    	id: null,
    	name: 'Assign'
    },{
    	id: 1,
    	name: 'David de Gea'
    },{
    	id: 2,
    	name: 'Wayne Rooney'
    },{
    	id: 2,
    	name: 'Ander Herrera'
    }];

    vm.filter = {} 
    vm.filter.applicationType = 1;

  });
