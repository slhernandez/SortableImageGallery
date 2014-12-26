var $ = require('jquery');
require('jquery-ui');
var gallery = {
  init: function() {
    console.log('gallery.js is loaded and ready...');
    var imageFilenames = [ "dsc_6001.jpg",
                      "dsc_6081.jpg",
                      "dsc_6013.jpg",
                      "dsc_6268.jpg",
                      "dsc_6397.jpg",
                      "dsc_6345.jpg",
                      "dsc_6378.jpg",
                      "dsc_6413.jpg",
                      "dsc_6417.jpg" ];

    // clone the gallery for cool draggable element effect.
    this.clone($('.gallery li'));

    // We want draggable elements that push others out of the way!
    $('.gallery').sortable({
      start: function(e, ui) {
        ui.helper.addClass('exclude-me');
        $('.gallery li:not(.exclude-me)').css('visibility', 'hidden');
        ui.helper.data("clone").hide();
      },
      stop: function(e, ui) {
        $('.gallery li.exclude-me').each(function() {
          var item = $(this);
          var clone = item.data('clone');
          var position = item.position();

          clone.css('left', position.left);
          clone.css('top', position.top);
          clone.show();

          item.removeClass('exclude-me');
        });

        $('.gallery li').css('visibility', 'visible');
      },
      change: function(e, ui) {
        $('.gallery li:not(.exclude-me, .ui-sortable-placeholder)').each(function() {
          var item = $(this);
          var clone = item.data('clone');
          clone.stop(true, false);
          var position = item.position();
          clone.animate({ left: position.left, top: position.top }, 500);
        });
      },
      revert: true,
      cursor: "move"
    });  // end of sortable
  },
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

      $('.cloned').append(img_clone);
    });
  },
  resizeHasStopped: function() {
    $('.cloned').show();
    if ( $('.cloned').is(':empty') ) {
      gallery.clone($('.gallery li'));
    }
  }
}

$(document).ready(function() {
  gallery.init();

  // Detect when screen is resized so we can re-clone the image gallery.
  var timer;
  $(window).on('resize orientationChanged', function() {
    $('.cloned').empty();
    timer && clearTimeout(timer);
    timer = setTimeout(gallery.resizeHasStopped, 1000);
  });
});

