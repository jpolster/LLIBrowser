var { ActionButton } = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data; 

var button = ActionButton({
    id: "my-button",
    label: "my button",
    icon: {
      "16": "./logo-16.png"
    },
    onClick: showPlugIn
  });

function showPlugIn(state){	
	tabs.activeTab.attach({
  		contentScriptFile: [data.url("jquery.min.js"), data.url("contentscript.js")],
  		contentScriptOptions: {
  			divContent: data.load("overlay.html"),
  			closeImg: data.url("close-16.png"),
  			helpImg: data.url("help-16.png"),
  			angularLib: data.url("angular.min.js"),
  			angularApp: data.url("app.js")
  		}
	});

}