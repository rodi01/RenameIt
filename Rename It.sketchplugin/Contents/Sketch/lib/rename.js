//
// Rename It
// by Rodrigo Soares
// http://github.com/rodi01/RenameIt
//

var RI = {
  extend: function(options, target) {
    var target = target || this;
    for (var key in options) {
      target[key] = options[key];
    }
    return target;
  }
}

// Rename
RI.extend({
  rename: function(layerName, currIdx, width, height, selectionCount, inputName, startsFrom) {
    var newLayerName = inputName;
    // Interator
    var nInterators = newLayerName.match(/%N+/ig),
        aInterators = newLayerName.match(/%A/ig),
        totalItems = selectionCount;


    // Number Interator
    if (nInterators != null) {
      var i = 0;

      function replaceNumber(match)
      {
        var nnSize = match.length - 1,
          letter = match.charAt(1),
          num	= (letter == "N") ? currIdx : totalItems - currIdx - 1;
          num += startsFrom;

          // Check weather or not the number is bigger than the nnSizes (works up to 9999)
          if (num > 999 && (nnSize == 1 || nnSize == 2 || nnSize == 3))
            nnSize = 4
          else if (num > 99 && (nnSize == 1 || nnSize == 2))
            nnSize = 3
          else if (num > 9 && nnSize == 1)
            nnSize = 2

        return RI.paddy(num, nnSize);
      }

      newLayerName = newLayerName.replace(/\%n+/ig, replaceNumber);
    }

    // Alpha Interator
    if (aInterators != null) {
      var i = 0,
          alphaStr = "abcdefghijklmnopqrstuvwxyz",
          alphaArr = alphaStr.split(""),
          totalAlpha = alphaArr.length;


      function replaceAlpha(match)
      {
        var aaSize = match.length - 1,
          letter = match.charAt(1),
          alpha	= alphaArr[currIdx % totalAlpha];

          if (currIdx >= totalAlpha)
          {
            var flIdx = Math.floor(currIdx / totalAlpha);
            alpha = "" + alphaArr[flIdx - 1] + "" + alpha
          }

        return (letter == "A") ? alpha.toUpperCase() : alpha
      }

      newLayerName = newLayerName.replace(/\%a/ig, replaceAlpha);
    }


    // Replace plus
    newLayerName = newLayerName.replace(/(\\\+)|\+/, function(_, a) { return a || layerName; });

    // Replace escaped plus
    newLayerName = newLayerName.replace(/\\\+/g, "+");

    // Replace asterisks
    newLayerName = newLayerName.replace(/(\\\*)|\*/g, function(_, a) { return a || layerName; });

    // Replace escaped asterisks
    newLayerName = newLayerName.replace(/\\\*/g, "*");

    // Add Width and/or height
      newLayerName = newLayerName.replace(/%w/ig, width);
      newLayerName = newLayerName.replace(/%h/ig, height);

      // Return new name
      return newLayerName;
  },
  paddy: function(n, p, c) {
      var pad_char = typeof c !== 'undefined' ? c : '0';
      var pad = new Array(1 + p).join(pad_char);
      return (pad + n).slice(-pad.length);
  },
  isInt: function(value) {
    return !isNaN(value) &&
           parseInt(Number(value)) == value &&
           !isNaN(parseInt(value, 10));
  }
});

// Find Replace
RI.extend({
  replaceText: function(layerName,findText, replaceWith, caseSensitive) {
    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    var reg = caseSensitive ? new RegExp(escapeRegExp(findText), "g") : new RegExp(escapeRegExp(findText), "gi");
    var found = layerName.match(reg);
    return layerName.replace(reg, replaceWith);
  }
});

RI.extend({
  isArtboard: function(el) {
    var className = el.class();
    return (className == "MSSymbolMaster") || (className == "MSArtboardGroup");
  }
});
