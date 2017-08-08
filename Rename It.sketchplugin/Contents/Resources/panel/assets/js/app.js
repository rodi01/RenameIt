$(document).ready(function() {
  var nameInput = $("#name"),
      sequenceInput = $("#sequence"),
      keywordsBtns = $(".keywordBtn"),
      clearBtn = $("#clearBtn"),
      debugEl = $("#debug"),
      debug = false;

  // Debug
  debugEl.attr('visibility', (debug) ? "visible" : "hidden");

  clearBtn.click(function(event) {
    nameInput.val("");
    nameInput.focus();
    $(this).removeClass('show');
    rename();
  });

  $(document).keypress(function(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if(code == 13) { $("#submitBtn").trigger('click'); }
  });
  nameInput.keyup(function(event) {
    var value = $(this).val()
    if (value.length > 0)
      clearBtn.addClass('show');
    else
      clearBtn.removeClass('show');

    rename();
  });

  sequenceInput.on('change', function(event) {
    rename();
  });

  keywordsBtns.children('a').click(function(event) {
    var nameValue = nameInput.val();
    var dataChar = $(this).attr('data-char');
    nameInput.val(nameValue + dataChar);
    nameInput.focus();
    clearBtn.addClass('show');
    rename();
    event.preventDefault();
  });

  nameInput.focus();

  $('#submitBtn').click(function(event) {
    RIAction('submit', {name: nameInput.val(), sequence: sequenceInput.val()});
  });
  $('#cancelBtn').click(function(event) {
    RIAction('close', null);
  });
});

// Parse Data
var selectiondata;
var initView = function(data) {
  selectiondata = data;
}

window.onfocus = function(){
  if (typeof RIAction != 'undefined') RIAction('focus');
};

function rename() {
  if (selectiondata == undefined || $('#name').val() == "") return;
  var renamed = [];
  for (var i = 0; i < selectiondata.selectionCount; i++) {
      var currentData = selectiondata.selection[i];
       renamed[i] = RI.rename(currentData.name, i, currentData.width, currentData.height, selectiondata.selectionCount, $('#name').val(), parseInt($('#sequence').val()));
  }
  $('#preview').html("Preview: <strong>" + renamed.join(", ") + "</strong>");
}
