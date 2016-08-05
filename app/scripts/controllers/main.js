'use strict';

var fillColours = {
                    "Black": "#000000",
                    "White": "#ffffff",
                    "News Red": "#c50a26",
                    "Dark red": "#8b0d16",
                    "Light red": "#ea5153",
                    "Dark blue": "#5a527e",
                    "Light blue": "#8695c5",
                    "Turquoise": "#75c6c5",
                    "Dark green": "#3a4f3a",
                    "Mid green": "#3f8688",
                    "Light green": "#8fc297",
                    "Brown": "#9d8672",
                    "Light brown": "#decab2",
                    "Yellow": "#fbbc33",
                    "Light yellow": "#ffdc88"
                  };

var textColours = {
                    "Black": "#000000",
                    "White": "#ffffff",
                    "Grey": "#808080"
                  };

/**
 * @ngdoc function
 * @name cardkitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cardkitApp
 */
angular.module('cardkitApp')
  .controller('MainCtrl', function ($scope, $filter, saveSvgAsPng, themeConfig) {

    $scope.config = {
      sizes: [
        {
          name: 'Twitter',
          width: 800 ,
          height: 400,
          default: true
        }
      ],
      themes: themeConfig,
      output: {
        scale: 1,
        editable: {
          scale: false
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
          fill: 'transparent'
        },
        elements: {
          background: {
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
              fill: fillColours
            }
          },
          image: {
            name: 'Image',
            type: 'image',
            width: 800,
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
          logo: {
            name: 'Logo',
            type: 'image',
            width: function() {
              return $scope.theme.logo.size[0];
            },
            height: function() {
              return $scope.theme.logo.size[1];
            },
            opacity: 1,
            src: function() {
              return $scope.theme.logo.src;
            },
            x: function () {
              return $scope.theme.logo.position[0];
            },
            y: function() {
              return $scope.theme.logo.position[1];
            },
            preserveAspectRatio: 'xMinYMin meet',
            draggable: {
              x: false,
              y: false
            },
            showHoverArea: false
          },
          headline: {
            name: 'Headline',
            type: 'text',
            text: 'Welcome to the Nature\nsocial media image generator,\nplease upload an image and\ncustomise the design.',
            fill: function() {
              return $scope.theme.quote;
            },
            fontSize: 48,
            fontFamily: function() {
              return $scope.theme.headline.font;
            },
            fontWeight: "normal",
            lineHeight: function() {
              return this.fontSize*1.3;
            },
            textAnchor: 'middle',
            x: '50%',
            y: 100,
            draggable: true,
            showHoverArea: true,
            editable: {
              text: true,
              fill: textColours,
              textAnchor: true,
              fontSize: {
                'Medium (36px)': 36,
                'Large (48px)': 48,
                'Extra Large (60px)': 60,
              },
            },
            useAsFilename: true
          },
          url: {
            name: 'URL',
            type: 'text',
            text: 'bit.ly/xyxyxy',
            fill: function() {
              return $scope.theme.quote;
            },
            fontSize: 24,
            lineHeight: 22,
            fontWeight: "normal",
            fontFamily: function() {
              return $scope.theme.url.font;
            },
            textAnchor: function () {
              return $scope.theme.url.alignedLeft ? "start" : "end";
            },
            x: function() {
              return $scope.theme.url.alignedLeft ? 60 : $scope.size.width - 60;
            },
            y: 378,
            draggable: true,
            showHoverArea: true,
            editable: {
              text: true,
              fill: textColours
            },
          },
          credit: {
            name: 'credit',
            type: 'text',
            text: 'Image credit',
            fill: function() {
              return $scope.theme.quote;
            },
            fontSize: 18,
            lineHeight: 22,
            fontWeight: "normal",
            fontFamily: function() {
              return $scope.theme.url.font;
            },
            textAnchor: "start",
            x: 0,
            y: 0,
            transform: "translate(10, 10) rotate(90)",
            draggable: false,
            showHoverArea: false,
            editable: {
              text: true,
              fill: textColours
            },
          }
        },
      }
    };

    function createConfigCopy() {
      $scope.defaultConfig = angular.copy($scope.config);
      $scope.$broadcast('resetSvg');
    }

    // Configure themes, set default
    if(typeof $scope.config.themes !== 'undefined') {
      var defaultTheme = $filter('filter')($scope.config.themes, {
        default: true
      }, true)[0];
      if(defaultTheme) {
        $scope.theme = defaultTheme;
      } else {
        $scope.theme = ($scope.config.themes.length > 1) ? null : $scope.config.themes[0];
      }
    }

    // Configure sizes, set default
    var defaultSize = $filter('filter')($scope.config.sizes, {
      default: true
    }, true)[0];
    if(defaultSize) {
      $scope.size = defaultSize;
    } else {
      $scope.size = ($scope.config.sizes.length > 1) ? null : $scope.config.sizes[0];
    }

    $scope.$watch('theme', function() {
      $scope.$broadcast('changeTheme');
      createConfigCopy();
    });

    $scope.$watch('size', function() {
      $scope.$broadcast('changeSize');
      createConfigCopy();
    });

    $scope.resetSvg = function() {
      $scope.config.svg = $scope.defaultConfig.svg
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

    /**
     * Read the supplied file (from DataTransfer API)
     */
    function readFile(file, key) {
      var reader = new FileReader();

      reader.onload = function() {
        $scope.config.svg.elements[key].src = reader.result;
        $scope.$apply();
      };

      reader.readAsDataURL(file);
    }

    /**
     * Gets the data transfer
     *
     * @param   {Event}   The data transfer event
     *
     * @return  The event's data transfer or null
     */
    function getDataTransfer(event) {
      event.stopPropagation();
      event.preventDefault();
      return event.dataTransfer || null;
    }

    /**
     * Slugifies the supplied string
     *
     * @param   {string}  text - The string to slugify
     *
     * @return  {string}  The slugified string
     */
    function slugify(text) {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }

    /**
     * Finds the first element with 'useAsFilename' set to true, and returns the file name based on it's text value
     *
     * @return  string  The file name
     */
    function findFileName() {
      // Map elements object to an array
      var elementsArray = [];
      angular.forEach($scope.config.svg.elements, function(value){
        elementsArray.push(value);
      });

      // Filter to find the element that has `useAsFilename` set as true
      var fileNameElement = $filter('filter')(elementsArray, {
        useAsFilename: true,
        type: 'text'
      }, true)[0];

      // Default the title to 'image.png'
      var fileName = 'image.png';

      // If we found an appropriate element, set that as the title instead
      if(fileNameElement && fileNameElement.text.length > 0) {
        // We run `slugify()` here to make it an acceptable file name
        fileName = slugify(fileNameElement.text) + '.png';
      }

      // Return the filename
      return fileName;
    }

    $scope.removeImage = function(key) {
      $scope.config.svg.elements[key].src = '';
    };

    $scope.downloadSvg = function() {
      // Get the file name
      var fileName = findFileName();

      // Run the conversion and download
      saveSvgAsPng(document.getElementById('snap-svg'), fileName, {
        scale: $scope.config.output.scale
      });
    };
  });
