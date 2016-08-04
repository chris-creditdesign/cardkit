'use strict';

/**
 * @ngdoc directive
 * @name cardkitApp.directive:fillEditor
 * @description
 * # fillEditor
 */
angular.module('cardkitApp')
  .directive('fillEditor', function () {
    return {
      template: '<div>' + 
                  '<label>Colour</label>' + 
                    '<select ng-model="element.fill" ng-options="name for (name, value) in field" class="form-control">' + 
                      '<option value="">-- Select a colour --</option>' + 
                    '</select>' + 
                  '</div>',
      restrict: 'E',
      scope: {
      	field: '=',
      	element: '='
      },
    };
  });