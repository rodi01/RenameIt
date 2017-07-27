@import "lib/rename.js";
@import "lib/common.js";
@import "lib/MochaJSDelegate.js";

var rename = function(context) {

	RI.init(context, "renameIt");
}

var findAndReplace = function(context) {

	RI.init(context, "findAndReplace");
}

var renameArtboard = function(context) {

	RI.init(context, "renameArtboard");
}
