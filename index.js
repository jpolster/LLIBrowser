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
  let currUrl = tabs.activeTab.url;
  var file = "file:///home/urmikl18/Test/SoftwareProject/LLIBrowser/overlay.html";
  //var file = "http://www-e.uni-magdeburg.de/jpolster/LLIBrowser/overlay.html";
  var completePath = file.concat("?url=").concat(currUrl);

  tabs.open(completePath)
}