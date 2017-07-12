(function() {
  var layersNormal = $(".layersNormal"),
      layersProcessed  = $('.layersProcessed');
  var interval =  setInterval(function () {
    if (layersNormal.is(':hidden')) {
      layersNormal.fadeIn();
      layersProcessed.fadeOut();
    } else {
      layersProcessed.fadeIn();
      layersNormal.fadeOut();
    };

  }, 5000);

  function showNext(el) {
    var nextTo = el.next();
    if (nextTo.length == 0) nextTo = el.siblings(":first");
    setTimeout( function(){
      el.addClass('showTooltip');
      el.siblings().removeClass('showTooltip');
      showNext(nextTo);
    }, 3000);
  }

  showNext($('.currLayerBtn'));

}());

jQuery.getScript("static/js/typed.min.js")
	.done(function() {
		console.log("loaded");
    var typed = new Typed("#widthTxtFld", {
        typeSpeed: 40,
        loop: true,
        strings: [$('#widthTxtFld').data("write")],
        backDelay: 6000,
        fadeOut: true
      });
});

// jQuery.getScript("static/js/typed.min.js").done(function() {
//   var typed = new Typed("#widthTxtFld", {
//     typeSpeed: 40,
//     loop: true,
//     strings: [$('widthTxtFld').data("write")]
//   });
