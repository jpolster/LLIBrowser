/**
 *@file Entrance point for the Add-On
 *@module index.js
 *@requires sdk/ui/button/action
 *@requires sdk/tabs
 *@requires sdk/self.data
 */

 var { ActionButton } = require("sdk/ui/button/action");
 var tabs = require("sdk/tabs");
 var data = require("sdk/self").data;
 const HTTP_REGEX = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

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
 *@desc Opens the add-on page from package in a new tab with the current page URL as a parameter
 */

 function showPlugIn(state){	
  // var file = "file:///home/urmikl18/Test/SoftwareProject/LLIStabil/data/overlay.html";
  //var file = "http://www-e.uni-magdeburg.de/jpolster/LLIBrowser/overlay.html";
  
  var currURL = "";
  if (!HTTP_REGEX.test(tabs.activeTab.url))
    currURL=data.url("dummy.html").replace("://","PSZP//");
  else
    currURL=tabs.activeTab.url.replace("://","PSZP//");

  tabs.open({
    url: data.url("overlay.html").concat("?url=").concat(currURL),
    inBackground: false,
    onReady: function(tab)
    {
      tab.attach({
        contentScriptFile: data.url("app.js")
      });
    }
  }); 
}