$(document).ready(function() {

  $(".clearBtn").click(function(event) {
    var theInputId = $(this).data('input');
    $("#" + theInputId).val("");
    $("#" + theInputId).focus();
    $(this).removeClass('show');
    rename();
  });

  $(document).keypress(function(event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    if(code == 13) { $("#submitBtn").trigger('click'); }
  });
  $('input[type="text"]').keyup(function(event) {
      var value = $(this).val();
      var clearBtn = $(this).next();
      if (value.length > 0)
        clearBtn.addClass('show');
      else
        clearBtn.removeClass('show');
      rename();
  });

  $('#caseSensitive').change(function(event) {
    rename();
  });

  $("#find").focus();

  $('#submitBtn').click(function(event) {
    RIAction('submit', {find: $("#find").val(), replace: $("#replace").val(), caseSensitive:$("#caseSensitive").is(':checked')});
    console.log("Submited");
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
  if (selectiondata == undefined || $('#find').val() == "") return;
  var renamed = [];
  for (var i = 0; i < selectiondata.selectionCount; i++) {
      var currentData = selectiondata.selection[i];
       renamed[i] = RI.replaceText(currentData.name, $('#find').val(), $('#replace').val(), $("#caseSensitive").is(':checked'));
  }
  $('#preview').html("Preview: <strong>" + renamed.join(", ") + "</strong>");
}
