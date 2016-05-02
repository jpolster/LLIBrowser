var { ActionButton } = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data; 

var isCalled=false;

var button = ActionButton({
    id: "my-button",
    label: "my button",
    icon: {
      "16": "./icon-16.png",
      "32": "./icon-32.png",
      "64": "./icon-64.png"
    },
    onClick: newTab
  });

function newTab(state){
if (isCalled)
{
	var pluginRunning="alert(\"Plug-In LLIBrowser is running\");";
	tabs.activeTab.attach({
  		contentScript: pluginRunning
	});
}

else
{
	isCalled=true;     
	
	tabs.activeTab.attach({
  		contentScriptFile: data.url("contentscript.js")
	});
}
}