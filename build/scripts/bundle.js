(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

    // Let's build an image gallery based on the list of images provided by 
    // the iamgeFilenames array.
    /*var images = '';
    $.each(imageFilenames, function(item, val) {
      images += '<li><img src="images/' + val + '"></li>'
    });
    $('.gallery').append(images);*/

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
  var timer;
  // Detect when screen is resized so we can re-clone the image gallery.
  $(window).on('resize orientationChanged', function() {
    $('.cloned').empty();
    timer && clearTimeout(timer);
    timer = setTimeout(gallery.resizeHasStopped, 1000);
  });
});


},{}]},{},[1]);
