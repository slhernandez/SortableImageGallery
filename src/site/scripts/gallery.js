var $ = require('jquery');
require('jquery-ui');
var lodash = require('lodash');

var gallery = {
  init: function() {
    // We want draggable elements that push others out of the way!
    $('.gallery').sortable({
      // Hide all the original slides and reveal only the cloned 
      // images that are placed on top.
      start: function(e, ui) {
        ui.helper.addClass('exclude-me');
        $('.gallery li:not(.exclude-me)').css('visibility', 'hidden');
        ui.helper.data("clone").hide();
      },
      // Animate the clone to the new positions.
      stop: function(e, ui) {
        $('.gallery li.exclude-me').each(function() {
          var image = $(this);
          var clone = image.data('clone');
          var position = image.position();

          clone.css('left', position.left);
          clone.css('top', position.top);
          clone.show();

          image.removeClass('exclude-me');
        });

        $('.gallery li').css('visibility', 'visible');
      },
      // As you drag the image, invisibly re-arrange the originals.
      change: function(e, ui) {
        $('.gallery li:not(.exclude-me, .ui-sortable-placeholder)').each(function() {
          var image = $(this);
          var clone = image.data('clone');
          // No more clone animations!
          clone.stop(true, false);
          // Get the position of the original (invisible) image.  This image
          // has already moved to it's new position. Animate it's matching clone.
          var position = image.position();
          clone.animate({ left: position.left, top: position.top }, 500);
        });
      },
      revert: true,
      cursor: "move"
    });  // end of sortable
  },
  // Loop through all the images and duplicate each one using 
  // jQuery's clone.  Position the cloned image on top of the 
  // original image.
  clone: function(gallery) {
    gallery.each(function() {
      var img = $(this);
      // sanitize img item before cloning.
      if (img.attr('style') !== undefined) {
        img.attr('style', 'visibility: visible;');
      }

      var img_clone = img.clone(); 
      img.data('clone', img_clone);

      // position the clone image
      var position = img.position();

      img_clone.css('left', position.left);
      img_clone.css('top', position.top);
      // insert the cloned image into the unordered list.
      $('.cloned').append(img_clone);
    });
  },
  resizeHasStopped: function() {
    if ( $('.cloned').is(':empty') ) {
      gallery.clone($('.gallery li'));
    }
  },
  generateImageGallery: function(gallery, images) {
    // Utilizing lodash micro-templating to dynamically 
    // create an image gallery based on the array of images.
    var imageItemTemplate = $('#imageItemTemplate');
    $.each(images, function(item, val) {
      gallery.append(lodash.template(imageItemTemplate.html(), {image: val}));
    });
  }
}

$(document).ready(function() {
  // Array for developer exercise.
  var imageFilenames = [ "dsc_6001.jpg",
                    "dsc_6081.jpg",
                    "dsc_6013.jpg",
                    "dsc_6268.jpg",
                    "dsc_6397.jpg",
                    "dsc_6345.jpg",
                    "dsc_6378.jpg",
                    "dsc_6413.jpg",
                    "dsc_6417.jpg" ];

  // Generate the image gallery based on imageFilenames array.
  gallery.generateImageGallery($('.gallery'), imageFilenames);
  // Setup any event handling for sorting with init()
  gallery.init();
  // Clone the image gallery for cool draggable element effect.
  gallery.clone($('.gallery li'));

  // Detect when screen is resized so we can re-clone the image gallery.
  var timer;
  $(window).on('resize orientationChanged', function() {
    $('.cloned').empty();
    timer && clearTimeout(timer);
    timer = setTimeout(gallery.resizeHasStopped, 1000);
  });
});

