/**
 *@file Contains angularjs functionality
 *@module app.js
 */
(function(){
	/**
	*@var app
	*@type angular.module
	*@name llibrowser
	*/
	var app = angular.module('llibrowser', []);

	/**
	 *@name TabCtrl
	 *@type angular.controller
	 *@desc Controller to perform tabs functionality
	 */
	app.controller('TabCtrl', function() {
		/**
		 *@var tab
		 *@type {Integer}
		 *@desc Value of a current tab
		 *@default 1
		 */
		this.tab=1;
		
		/**
		 *@var tabStyle
		 *@type {String[]}
		 *@desc Style values of the tabs
		 *@default tabStyle[1]=ACTIVE_TAB_STYLE
		 */
		this.tabStyle = [
		{
			'background': ACTIVE_TAB_STYLE
		},
		{
			'background': NONACTIVE_TAB_STYLE
		},
		{
			'background': NONACTIVE_TAB_STYLE
		},
		{
			'background': NONACTIVE_TAB_STYLE
		},
		{
			'background': NONACTIVE_TAB_STYLE
		},
		{
			'background': NONACTIVE_TAB_STYLE
		},
		{
			'background': NONACTIVE_TAB_STYLE
		}];

		/**
		 *@var activeTabs
		 *@type {Boolean[]}
		 *@desc Array connected to the checkboxes in overlay.html
		 *@default activeTabs[i]=true
		 */
		this.activeTabs=[true,true,true,true,true,true,true];

		/**
		 *@function selectTab
		 *@param {Integer} setTab
		 *@return Sets the tab=setTab and changes the tabs' style
		 */
		this.selectTab=function(setTab) {
			this.tab=setTab;
			for (i=0;i<7;i++)
			{
				if (i!=setTab-1)
				{
					this.tabStyle[i] = {
						'background': NONACTIVE_TAB_STYLE
					};
				}
				else {
				this.tabStyle[setTab-1] = {
					'background' : ACTIVE_TAB_STYLE
				};
				}
			}
		};

		/**
		 *@function isSelected
		 *@param {Integer} checkTab
		 *@return true if this.tab = checkTab, else false
		 */
		this.isSelected=function(checkTab) {
			return this.tab==checkTab;
		};
	});

	/**
	 *@name newPageCtrl
	 *@type angular.controller
	 *@desc Controller that allows user to refresh add-on with new URL
	 */
	app.controller('newPageCtrl',  function() {
		/**
		 *@var parameters
		 *@desc Extracted parameters from the address
		 */
		var parameters = location.search.substring(1).split("&");

		/**
		 *@var temp
		 *@desc First parameter of parameters
		 */
    	var temp = parameters[0].split("=");
    	/**
    	 *@var page
    	 *@desc The current page URL
    	 */
    	var page = unescape(temp[1]);

    	/**
    	 *@var oldURL
    	 *@desc The current value of URL for LLIDelivery
    	 */
    	this.oldURL = encodeURIComponent(page);

    	/**
    	 *@var newURL
    	 *@desc The new value of URL for LLIDelivery
    	 *@default ""
    	 */
    	this.newURL="";
    	/**
    	 *@function setURL
    	 *@returns Sets oldURL as newURL and resets the value of newURL
    	 */
    	this.setURL=function() {
    		this.oldURL=encodeURIComponent(this.newURL);
    		this.newURL="";
    	};

	});

	/**
	 *@name ServerCtrl
	 *@type angular.controller
	 *@desc Controller that enables fetching .json from server
	 */
	app.controller('ServerCtrl',['$http', function($http) {
    var storage=this;
    storage.llis=[];
    var pageURL="http://localhost:3000/resource/http%3A%2F%2Fwww.google.com";
    $http.get(pageURL).success(function(data){
      console.log("Successful connections with server");
      storage.llis=data;
    })
    .error(function(data){
    	console.log("Connection with server failed");
    });
  }]);

	/**
	 *@const ACTIVE_TAB_STYLE
	 *@desc The background-color for the active tab
	 *@default #75bbf7
	 */
	const ACTIVE_TAB_STYLE='#75bbf7';
	/**
	 *@const NONACTIVE_TAB_STYLE
	 *@desc The background-color for the non-active tab
	 *@default #313192
	 */
	const NONACTIVE_TAB_STYLE='#313192';

})();