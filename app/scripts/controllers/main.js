'use strict';

/**
 * @ngdoc function
 * @name cardkitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cardkitApp
 */
angular.module('cardkitApp')
  .controller('MainCtrl', function ($scope, saveSvgAsPng, themeConfig) {
    
    $scope.config = {
      sizes: [
        {
          name: 'Twitter',
          width: 800,
          height: 400,
        }
      ],
      themes: themeConfig,
      output: {
        scale: 1,
        editable: {
          scale: true
        }
      },
      svg: {
        canvas: {
          height: function() {
            return $scope.size.height;
          },
          width: function() {
            return $scope.size.width;
          },
        },
        elements: [
          {
            name: 'Background Colour',
            type: 'rect',
            height: function() {
              return $scope.size.height;
            },
            width: function() {
              return $scope.size.width;
            },
            fill: function() {
              return $scope.theme.background;
            },
            editable: {
              fill: 'picker'
            }
          },
          {
            name: 'Background Image',
            type: 'image',
            width: 600,
            height: function() {
              return this.width;
            },
            src: '',
            opacity: 1,
            x: '0%',
            y: '0%',
            preserveAspectRatio: 'xMinYMin meet',
            draggable: true,
            defaultFilter: '',
            editable: {
              src: true,
              width: true,
              opacity: true,
              filters: [
                'Sepia',
                'Grayscale',
                'Saturate',
                'Invert',
                'Blur'
              ],
            }
          },
          {
            name: 'Headline',
            type: 'text',
            text: 'New Act Night!',
            fill: function() {
              return $scope.theme.quote;
            },
            fontSize: 80,
            fontFamily: function() {
              return $scope.theme.headlineFont;
            },
            textAnchor: 'start',
            x: 50,
            y: 100,
            draggable: true,
            editable: {
              text: true,
              fill: 'picker',
              textAnchor: true,
              fontSize: {
                '26px Small': 26,
                '32px Medium': 32,
                '40px Large': 40,
                '60px Mental': 60,
                '80px Insane': 80
              },
            },
          },
          {
            name: 'Blurb',
            type: 'text',
            text: "MC Angela Barnes hosts as the latest fresh new fledgling \ncomics from Jill Edwards Stand-Up Comedy Course at \nBrighton's Komedia take to the stage for the very first time.",
            fill: function() {
              return $scope.theme.quote;
            },
            fontSize: 26,
            fontFamily: function() {
              return $scope.theme.headlineFont;
            },
            textAnchor: 'start',
            x: 50,
            y: 160,
            draggable: true,
            editable: {
              text: true,
              fontSize: {
                '26px Small': 26,
                '32px Medium': 32,
                '40px Large': 40,
                '60px Mental': 60,
                '80px Insane': 80
              },
              fill: 'picker',
              textAnchor: true 
            },
          },
          {
            name: 'Details',
            type: 'text',
            text: 'Tuesday 1st December £7/£5 Doors 7pm \nkomedia.co.uk/brighton',
            fill: function() {
              return $scope.theme.quote;
            },
            fontSize: 22,
            fontFamily: function() {
              return $scope.theme.headlineFont;
            },
            textAnchor: 'start',
            x: 50,
            y: 340,
            draggable: true,
            editable: {
              text: true,
              fontSize: {
                '26px Tiny': 22,
                '26px Small': 26,
                '32px Medium': 32,
                '40px Large': 40,
                '60px Mental': 60,
                '80px Insane': 80
              },
              fill: 'picker',
              textAnchor: true 
            },
          },

          {
            name: 'Logo',
            type: 'image',
            width: 300,
            height: function() {
              return this.width;
            },
            src: function() {
              return $scope.theme.logoSrc;
            },
            opacity: 1,
            x: 40,
            y: 130,
            preserveAspectRatio: 'xMinYMin meet',
            editable: {
              src: true,
              width: true,
            },
            draggable: true
          },

        ],
      }
    };

    function createConfigCopy() {
      $scope.defaultConfig = angular.copy($scope.config);
      $scope.$broadcast('resetSvg');
    }

    if(typeof $scope.config.themes !== 'undefined') {
      $scope.theme = ($scope.config.themes.length > 1) ? null : $scope.config.themes[0];
    }

    $scope.size = ($scope.config.sizes.length > 1) ? null : $scope.config.sizes[0];

    $scope.$watch('theme', function() {
      $scope.$broadcast('changeTheme');
      createConfigCopy();
    });

    $scope.$watch('size', function() {
      $scope.$broadcast('changeSize');
      createConfigCopy();
    });

    $scope.resetSvg = function() {
      $scope.config.svg = $scope.defaultConfig.svg;
      createConfigCopy();
    };

    // Drop handler.
    $scope.onDrop = function (data, event, key) {
      var dataTransfer = getDataTransfer(event);
      readFile(dataTransfer.files[0], key);
    };

    $scope.fileChanged = function(file) {
      readFile(angular.element(file)[0].files[0], angular.element(file).data('key'));
    };

    // Read the supplied file (from DataTransfer API)
    function readFile(file, key) {
      var reader = new FileReader();

      reader.onload = function() { 
        $scope.config.svg.elements[key].src = reader.result;
        $scope.$apply();
      };

      reader.readAsDataURL(file);
    }

    // Get the data transfer
    function getDataTransfer(event) {
      event.stopPropagation();
      event.preventDefault();
      return event.dataTransfer || null;
    }

    $scope.removeImage = function(key) {
      $scope.config.svg.elements[key].src = '';
    };


    $scope.downloadSvg = function() {
      saveSvgAsPng(document.getElementById('snap-svg'), 'image.png', {
        scale: $scope.config.output.scale
      });
    };
  });
