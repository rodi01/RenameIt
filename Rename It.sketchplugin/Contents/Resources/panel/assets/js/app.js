var nameInput = $("#name"),
    sequenceInput = $("#sequence"),
    keywordsBtns = $(".keywordBtn"),
    clearBtn = $("#clearBtn"),
    debugEl = $("#debug"),
    debug = false;

// Debug
debugEl.style.visibility = (debug) ? "visible" : "hidden";

clearBtn.onclick = function(e) {
  nameInput.value = "";
  nameInput.focus();
  this.style.visibility = "hidden";
};
document.onkeypress = function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if(code == 13) { submit(); }
};
nameInput.onkeyup = function() {
  clearBtn.style.visibility = (this.value.length) ? "visible" : "hidden";
};

[].forEach.call(keywordsBtns, function (el) {
  var link = el.getElementsByTagName("a")[0];

  link.onclick = function(e) {
    nameInput.value = nameInput.value + link.getAttribute("data-char");
    nameInput.focus();
    clearBtn.style.visibility = "visible";
    e.preventDefault();
  };
});

nameInput.focus();

function submit() {
  RIAction('submit', {name: nameInput.value, sequence: sequenceInput.value});
}
function cancel() {
  RIAction('close', null);
}
