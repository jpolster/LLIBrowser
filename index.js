var { ActionButton } = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data; 

var button = ActionButton({
    id: "my-button",
    label: "my button",
    icon: {
      "16": "./logo-16.png"
    },
    onClick: newTab
  });

function newTab(state){ 
  tabs.activeTab.attach({
      contentScriptFile: data.url("contentscript.js")
  });

}