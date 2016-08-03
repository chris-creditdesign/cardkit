'use strict';

/**
 * @ngdoc directive
 * @name cardkitApp.directive:textanchorEditor
 * @description
 * # textanchorEditor
 */
angular.module('cardkitApp')
  .directive('textanchorEditor', function () {
    return {
      template: '<div>' +
            '<label>Align Text</label>' +
            '<select ng-model="element.textAnchor" class="form-control">' +
              '<option value="start">Left</option>' +
              '<option value="middle">Centre</option>' +
              '<option value="end">Right</option>' +
            '</select>' +
          '</div>',
      restrict: 'E',
      replace: true,
  	  scope: {
  	    element: '='
  	  },
    };
  });
