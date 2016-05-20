var { ActionButton } = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data; 

var button = ActionButton({
    id: "my-button",
    label: "Start LLIBrowser",
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
  			angularLib: data.url("angular.min.js"),
  			angularApp: data.url("app.js")
  		}
	});

}