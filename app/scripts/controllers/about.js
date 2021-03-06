'use strict';

/**
 * @ngdoc function
 * @name simplefiAdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the simplefiAdminApp
 */
angular.module('simplefiAdminApp')
  .controller('ApplicationSearchCtrl', function (Restangular) {
    var vm = this;

    vm.testLogin = function(){
        Restangular.one('Login').customPOST({model: {Email: 'admin@simplefinow.com', Password: 'admin'}}, null, {}, {})
        .then(function(res){
            // console.log(res.status);
        }, function(err){
            console.log(err);
        })
    };

    vm.yesNo = [{
    	id: true,
    	name: 'Yes'
    }, {
    	id: false,
    	name: 'No'
    }];

    vm.filters = [
        'Favorite 1', 'Favorite 2', 'Favorite 3', 'Favorite 4'
    ];

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
    	id: 3,
    	name: 'Ander Herrera'
    }];

    vm.filter = {} 
    vm.filter.applicationType = 1;

  });
