(function(){
	var app = angular.module('llibrowser', []);

	app.controller('TabCtrl', function() {
		//initial tab value
		this.tab=1;
		
		//initial style value
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

		//initially all tabs are shown, attached to checkbox with ng-model
		this.activeTabs=[true,true,true,true,true,true,true];

		//select new tab & highlight it
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

		//checks if the tab is selected
		this.isSelected=function(checkTab) {
			return this.tab==checkTab;
		};
	});

	app.controller('newPageCtrl', ['$window','$location', function($window,$location) {
		var parameters = location.search.substring(1).split("&");

    	var temp = parameters[0].split("=");
    	var url = unescape(temp[1]);

    	this.oldURL = encodeURIComponent(url);

    	this.newURL="";
    	this.setURL=function() {
    		this.oldURL=encodeURIComponent(this.newURL);
    		this.newURL="";
    		var file = "file:///home/urmikl18/Test/SoftwareProject/LLIBrowser/overlay.html";
    		var completePath = file.concat("?url=").concat(this.oldURL);
  			$location.path(completePath);
    	};

	}]);

	//constants
	var ACTIVE_TAB_STYLE='#75bbf7';
	var NONACTIVE_TAB_STYLE='#313192';

})();
