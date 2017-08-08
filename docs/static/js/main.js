(function() {
  var clDone, clNormal, clTyped, interval, layersNormal, layersProcessed, showNext, toggleLayer, whDone, whNormal, whTyped;
  layersNormal = $('.layersNormal');
  layersProcessed = $('.layersProcessed');
  interval = setInterval((function() {
    if (layersNormal.is(':hidden')) {
      layersNormal.fadeIn();
      layersProcessed.fadeOut();
    } else {
      layersProcessed.fadeIn();
      layersNormal.fadeOut();
    }
  }), 5000);
  showNext = function(el) {
    var nextTo;
    nextTo = el.next();
    if (nextTo.length === 0) {
      nextTo = el.siblings(':first');
    }
    setTimeout((function() {
      el.addClass('showTooltip');
      el.siblings().removeClass('showTooltip');
      showNext(nextTo);
    }), 3000);
  };
  showNext($('.currLayerBtn'));
  whDone = $('.wh_done');
  whNormal = $('.wh_normal');
  toggleLayer = function(toShow, toHide) {
    toShow.addClass('show').removeClass('hide');
    return toHide.addClass('hide').removeClass('show');
  };
  whTyped = new Typed('#widthTxtFld', {
    typeSpeed: 40,
    startDelay: 1000,
    loop: true,
    backSpeed: 40,
    backDelay: 6000,
    strings: [$('#widthTxtFld').data('write')],
    onComplete: function(self) {
      $('#whPreview').text($('#whPreview').data('write'));
      toggleLayer(whDone, whNormal);
      return false;
    },
    onLastStringBackspaced: function(self) {
      $('#whPreview').text('');
      toggleLayer(whNormal, whDone);
      return false;
    }
  });
  clDone = $('.cl_done');
  clNormal = $('.cl_normal');
  clTyped = new Typed('#clTextField', {
    typeSpeed: 50,
    startDelay: 1000,
    loop: true,
    backSpeed: 40,
    backDelay: 6000,
    strings: [$('#clTextField').data('write')],
    onComplete: function(self) {
      $('#clPreview').text($('#clPreview').data('write'));
      toggleLayer(clDone, clNormal);
      return false;
    },
    onLastStringBackspaced: function(self) {
      $('#clPreview').text('');
      toggleLayer(clNormal, clDone);
      return false;
    }
  });
  $.get('https://api.github.com/repos/rodi01/renameit', function(data) {
    $('#forkIt em').text(data.forks);
    $('#starIt em').text(data.stargazers_count);
  });
  $("a[href*=\\#]").click(function(e) {
    var dest;
    e.preventDefault();
    dest = $(this).attr('href');
    $('html,body').animate({
      scrollTop: $(dest).offset().top
    }, 'slow');
  });
})();
