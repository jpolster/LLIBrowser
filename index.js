/**
 *@file Entrance point for the Add-On
 *@module index.js
 */

var { ActionButton } = require("sdk/ui/button/action");
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;

/**
 *@var button
 *@type ActionButton
 *@desc Add-On start button
 */
var button = ActionButton({
    id: "my-button",
    label: "Start LLIBrowser",
    icon: {
      "16": "./img/logo-16.png"
    },
    onClick: showPlugIn
  });

/**
 *@function showPlugIn
 *@param state
 *@returns Opens the add-on in a new tab with the current page URL as a parameter
*/

function showPlugIn(state){	
  // let currUrl = tabs.activeTab.url;
  // var file = "file:///home/urmikl18/Test/SoftwareProject/LLIStabil/data/overlay.html";
  // //var file = "http://www-e.uni-magdeburg.de/jpolster/LLIBrowser/overlay.html";
  // //var file=data.url("overlay.html");
  // //console.log(file);
  // var completePath = file.concat("?url=").concat(currUrl);

  // tabs.open(completePath);

  if (tabs.activeTab.url == "about:blank" || tabs.activeTab.url == "about:newtab")
  {tabs.open({
    url: data.url("overlay.html").concat("?url=").concat(data.url("dummy.html").replace("://","PSZP//")),
    inBackground: false,
    onReady: function(tab)
    {
      tab.attach({
        contentScriptFile: data.url("app.js")
      });
    }
  }); 
}     
  else {tabs.open({
    url: data.url("overlay.html").concat("?url=").concat(tabs.activeTab.url.replace("://","PSZP//")),
    inBackground: false,
    onReady: function(tab)
    {
      tab.attach({
        contentScriptFile: data.url("app.js")
      });
    }
  });
}
}