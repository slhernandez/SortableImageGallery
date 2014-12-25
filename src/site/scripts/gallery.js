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
    console.log('imageFilenames ...', imageFilenames);

    var gallery = $('.gallery li');
    this.clone(gallery);

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
      console.log('img attributes:', img.attr('style'));
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
    console.log('screen no longer resizing');
    $('.cloned').show();
    if ( $('.cloned').is(':empty') ) {
      gallery.clone($('.gallery li'));
    }
  }
}

$(document).ready(function() {
  gallery.init();
  var timer;
  $(window).on('resize orientationChanged', function() {
    console.log('screen is changing size');
    $('.cloned').empty();
    timer && clearTimeout(timer);
    timer = setTimeout(gallery.resizeHasStopped, 1000);
  });
});

