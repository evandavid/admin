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
                jQuery('.sidebar').toggleClass('iconic').toggleClass('active');
            })
        }
    };
})
.directive('searchResult', function ($window) {
    return {
        restrict: 'C',
        link: function(scope, elem){
            var xHeight = $window.innerHeight - 230;
            if (xHeight < 300) { xHeight = $window.innerHeight; }
            elem.css('min-height', xHeight+'px');
        }
    };
})
.directive('mobileExtraMenu', function ($compile) {
    return {
        restrict: 'A',
        link: function(scope, elem){
            // copy all extra menu and add to mobile container
            var extramenus = function(){
                var theMenu = jQuery('.extra-menus').clone();
                console.log(theMenu);
                elem.html('');
                elem.html($compile(theMenu)(scope));
                return theMenu;
            };

            // jQuery('.extra-menus-container').bind('DOMSubtreeModified', function(){
                extramenus();
            // }); 
        }
    };
})
.directive('pikaday', function () {
    return {
        restrict: 'C',
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            var thisDay = new Date();
            new Pikaday({
                field: jQuery(element)[0],
                format: 'MM/DD/YYYY',
                yearRange: [1960, (thisDay.getUTCFullYear()+20)],
                onSelect: function() {
                    ngModel.$setViewValue(this.getMoment().format('MM/DD/YYYY'));
                }
            });
        }
    };
  })
.directive('filterItem', function ($window) {
    return {
        restrict: 'C',
        link: function(scope, elem){
            elem.bind('click', function(){
                var input = jQuery(elem).find('input');
                if (input){
                    input.focus();
                }
            });
        }
    };
})
.directive('dateRemove', function ($window) {
    return {
        restrict: 'C',
        link: function(scope, elem){
            elem.bind('click', function(){
                var xinput   = jQuery(elem).prev();
                if (xinput){
                    var angInput = angular.element(xinput).data('$ngModelController')
                    angInput.$setViewValue(null);
                    xinput.val('')
                }
            });
        }
    };
})
.directive('sidebar', function () {
    return {
        restrict: 'C',
        link: function(scope, elem){
            var childs = jQuery(elem).children();
            childs.bind('click', function(){
                jQuery(this).addClass('active').siblings().removeClass('active');
            })
        }
    };
})
.directive('autoSize', function () {
    return {
        restrict: 'A',
        link: function(scope, elem){
            function resizeInput() {
                jQuery(elem).attr('size', (jQuery(elem).val().length - 5));
            }
            jQuery(elem).keyup(resizeInput).each(resizeInput);
        }
    };
})
.directive('tableRow', function () {
    return {
        restrict: 'A',
        link: function(scope, elem){
            elem.bind('click', function(){
                var parent = jQuery(elem).parent();
                parent.toggleClass('active');
                var checkbox = parent.find('input[type="checkbox"]');
                if (checkbox) { checkbox.prop('checked', parent.hasClass('active')); }
                jQuery(parent).find('.detail').toggleClass('active')
                            .prev().find('span')
                                   .toggleClass('glyphicon-minus')
                                   .toggleClass('glyphicon-plus');

                var siblings = jQuery(parent).siblings();
                siblings.removeClass('active');
                for (var i = 0; i < siblings.length; i++) {
                    jQuery(siblings[i]).find('.detail').removeClass('active')
                                       .prev().find('span')
                                              .addClass('glyphicon-plus')
                                              .removeClass('glyphicon-minus');
                };
            });
        }
    };
})
.directive('fullscreen', function () {
    return {
        restrict: 'A',
        link: function(scope, elem){
            elem.bind('click', function(){
                var modal = jQuery('#application-detail');
                var modalContent = modal.find('.modal-body');
                modalContent.html('');
                var content = jQuery(elem).parent().parent().parent().parent();
                modalContent.html(content.html());
            });
        }
    };
})
.directive('sortableRow', function () {
    return {
        restrict: 'A',
        link: function(scope, elem){
            var holder = '<div class="pull-right"><i class="fa fa-sort"></i></div>';
            jQuery(elem).append(holder).addClass('sortable');
            elem.bind('click', function(){
                var others    = jQuery('.sortable').not(this);
                for (var i = 0; i < others.length; i++) {
                    var _theHolder = jQuery(others[i]).find('.pull-right').find('i');
                        _theHolder.addClass('fa-sort').removeClass('fa-sort-desc').removeClass('fa-sort-asc');
                }

                var theHolder = jQuery(elem).find('.pull-right').find('i');
                if (!theHolder.hasClass('fa-sort-asc')){
                    theHolder.addClass('fa-sort-asc').removeClass('fa-sort-desc');
                }else{
                    theHolder.addClass('fa-sort-desc').removeClass('fa-sort-asc');
                }
            });
        }
    };
})
.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++){
            input.push(i);
        }
        return input;
    };
})
.directive('dropdown', function () {
    return {
        restrict: 'A',
        scope: { data: '='},
        require: 'ngModel',
        template: '<div class="dropdown">\
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">{{getView}}\
                    <span class="caret"></span></button>\
                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\
                      <li role="presentation" ng-repeat="option in data"><a style="cursor:pointer" role="menuitem" tabindex="-1" x-ng-click="setNewValue(option.id)">{{option.name}}</a></li>\
                    </ul>\
                  </div>',
        link: function(scope, elem, attr, ngModelCtrl){
            var getObj = function(id){
                var obj = null;
                for (var i=0;i<scope.data.length;i++){if(scope.data[i].id===id){obj=scope.data[i];}}
                return obj;
            };

            var getView = function(){
                var theObj = getObj(ngModelCtrl.$modelValue);
                return theObj ? theObj.name : scope.data[0].name;
            };

            var unregister = scope.$watch(function(){
                return ngModelCtrl.$modelValue;
            }, initialize);

            // wait ngModel to be initialized
            function initialize(value){
                ngModelCtrl.$setViewValue(value);
                scope.getView = getView();
                unregister();
            }

            // option clicked
            scope.setNewValue = function(id){
                ngModelCtrl.$setViewValue(id);
                scope.getView = getView();
            };
        }
    };
})
.directive('dropdownSearch', function () {
    return {
        restrict: 'A',
        scope: { data: '='},
        require: 'ngModel',
        template: '<div class="dropdown">\
                    <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown"><span class="glyphicon glyphicon-user" style="font-size:11px"></span> {{getView}}\
                    <span class="caret"></span></button>\
                    <ul class="dropdown-menu large" role="menu" aria-labelledby="menu1">\
                      <li role="presentation"><input type="text" class="search-dropdown" placeholder="Search" ng-model="xfilter" ng-change="filterData()"></li>\
                      <li role="presentation" ng-repeat="option in shadowData" ng-if="option.id"><a style="cursor:pointer;outline:none" role="menuitem" tabindex="-1" x-ng-click="setNewValue(option.id, option, $event)"><span aria-hidden="true" class="glyphicon red" ng-class="{\'glyphicon-remove\': !option.$selected, \'glyphicon-ok\': option.$selected, }"></span> {{option.name}}</a></li>\
                    </ul>\
                  </div>',
        link: function(scope, elem, attr, ngModelCtrl){
            scope.shadowData = angular.copy(scope.data);
            var getObj = function(id){
                var obj = null;
                for (var i=0;i<scope.data.length;i++){if(scope.data[i].id===parseInt(id)){obj=scope.data[i];}}
                return obj;
            };

            var getView = function(){
                if (!ngModelCtrl.$modelValue) { ngModelCtrl.$modelValue = [];}
                if (ngModelCtrl.$modelValue.length === 0){
                    return scope.data[0].name;
                } else if (ngModelCtrl.$modelValue.length === 1){
                    var theObj = getObj(ngModelCtrl.$modelValue);
                    return theObj ? theObj.name : scope.data[0].name;
                }else {
                    return ngModelCtrl.$modelValue.length + ' selected';
                }
            };

            var searchData = function(value){
                scope.shadowData = [];
                for (var i=0;i<scope.data.length;i++){if(scope.data[i].name.toLowerCase().indexOf(value.toLowerCase()) > -1){scope.shadowData.push(scope.data[i]);}}    
            };

            var unregister = scope.$watch(function(){
                return ngModelCtrl.$modelValue;
            }, initialize);

            scope.filterData = function(){
                searchData(scope.xfilter);
            };

            // wait ngModel to be initialized
            function initialize(value){
                ngModelCtrl.$setViewValue(value);
                scope.getView = getView();
                unregister();
            }

            // option clicked
            scope.setNewValue = function(id,item, $event){
                if (id){
                    if (!ngModelCtrl.$viewValue) { ngModelCtrl.$viewValue = [];}
                    var values = ngModelCtrl.$viewValue;
                    var theObj = getObj(id);
                    if (values.indexOf(id) > -1){
                        values.splice(values.indexOf(id), 1);
                        item.$selected   = false;
                        theObj.$selected = false;
                    } else {
                        item.$selected   = true;
                        theObj.$selected = true;
                        values.push(id);
                    }
                    ngModelCtrl.$setViewValue(values);
                    scope.getView = getView();
                }
                $event.stopPropagation();
            };
        }
    };
});