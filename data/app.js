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
	var app = angular.module('llibrowser', ['ngSanitize']);

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
	 *@name ServerCtrl
	 *@type angular.controller
	 *@desc Controller that enables fetching .json from server
	 */
	app.controller('ServerCtrl',['$http', function($http) {
    	var storage=this;
    	storage.llis=[];
    	storage.faqs=[];
    	storage.codes=[];
    	storage.videos=[];
    	storage.audios=[];
    	storage.slides=[];
    	storage.tables=[];
    	storage.texts=[];

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

    	function faqFilter(obj) {
    		for (var i=0;i<obj["lom:educational"]["dcterms:type"].length;++i) {
    			var cmp = obj["lom:educational"]["dcterms:type"][i]["rdf:label"].trim().toLowerCase();
    			if ( cmp == FAQ || cmp == CODE || cmp == VIDEO || cmp == AUDIO 
    				|| cmp == SLIDES || cmp == TABLE || cmp == NARRATIVE_TEXT) 
    			{
    				if (cmp == FAQ)
    					return true;
    				else
    					return false;
    			}
    		}
    		return false;
    	}

    	function codeFilter(obj) {
    		for (var i=0;i<obj["lom:educational"]["dcterms:type"].length;++i) {
    			var cmp = obj["lom:educational"]["dcterms:type"][i]["rdf:label"].trim().toLowerCase();
    			if ( cmp == FAQ || cmp == CODE || cmp == VIDEO || cmp == AUDIO 
    				|| cmp == SLIDES || cmp == TABLE || cmp == NARRATIVE_TEXT) 
    			{
    				if (cmp == CODE)
    					return true;
    				else
    					return false;
    			}
    		}
    		return false;
    	}

    	function videoFilter(obj) {
    		for (var i=0;i<obj["lom:educational"]["dcterms:type"].length;++i) {
    			var cmp = obj["lom:educational"]["dcterms:type"][i]["rdf:label"].trim().toLowerCase();
    			if ( cmp == FAQ || cmp == CODE || cmp == VIDEO || cmp == AUDIO 
    				|| cmp == SLIDES || cmp == TABLE || cmp == NARRATIVE_TEXT) 
    			{
    				if (cmp == VIDEO)
    					return true;
    				else
    					return false;
    			}
    		}
    		return false;
    	}

    	function audioFilter(obj) {
    		for (var i=0;i<obj["lom:educational"]["dcterms:type"].length;++i) {
    			var cmp = obj["lom:educational"]["dcterms:type"][i]["rdf:label"].trim().toLowerCase();
    			if ( cmp == FAQ || cmp == CODE || cmp == VIDEO || cmp == AUDIO 
    				|| cmp == SLIDES || cmp == TABLE || cmp == NARRATIVE_TEXT) 
    			{
    				if (cmp == AUDIO)
    					return true;
    				else
    					return false;
    			}
    		}
    		return false;
    	}

    	function tableFilter(obj) {
    		for (var i=0;i<obj["lom:educational"]["dcterms:type"].length;++i) {
    			var cmp = obj["lom:educational"]["dcterms:type"][i]["rdf:label"].trim().toLowerCase();
    			if ( cmp == FAQ || cmp == CODE || cmp == VIDEO || cmp == AUDIO 
    				|| cmp == SLIDES || cmp == TABLE || cmp == NARRATIVE_TEXT) 
    			{
    				if (cmp == TABLE)
    					return true;
    				else
    					return false;
    			}
    		}
    		return false;
    	}

    	function slidesFilter(obj) {
    		for (var i=0;i<obj["lom:educational"]["dcterms:type"].length;++i) {
    			var cmp = obj["lom:educational"]["dcterms:type"][i]["rdf:label"].trim().toLowerCase();
    			if ( cmp == FAQ || cmp == CODE || cmp == VIDEO || cmp == AUDIO 
    				|| cmp == SLIDES || cmp == TABLE || cmp == NARRATIVE_TEXT) 
    			{
    				if (cmp == SLIDES)
    					return true;
    				else
    					return false;
    			}
    		}
    		return false;
    	}

    	function textFilter(obj) {
    		for (var i=0;i<obj["lom:educational"]["dcterms:type"].length;++i) {
    			var cmp = obj["lom:educational"]["dcterms:type"][i]["rdf:label"].trim().toLowerCase();
    			if ( cmp == FAQ || cmp == CODE || cmp == VIDEO || cmp == AUDIO 
    				|| cmp == SLIDES || cmp == TABLE || cmp == NARRATIVE_TEXT) 
    			{
    				if (cmp == NARRATIVE_TEXT)
    					return true;
    				else
    					return false;
    			}
    		}
    		return false;
    	}

    	//var pageURL="http://localhost:3000/resource/"+this.oldURL;
    	var pageURL="products.json";
    	$http.get(pageURL).success(function(data){
      	console.log("Successful connections with server");
      	storage.llis=data;
      	storage.faqs=storage.llis.filter(faqFilter);
      	storage.codes=storage.llis.filter(codeFilter);
      	storage.videos=storage.llis.filter(videoFilter);
      	storage.audios=storage.llis.filter(audioFilter);
      	storage.slides=storage.llis.filter(slidesFilter);
      	storage.tables=storage.llis.filter(tableFilter);
      	storage.texts=storage.llis.filter(textFilter);
    	})
    	.error(function(data){
    	console.log("Connection with server failed");
    	});

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
    		//var pageURL="http://localhost:3000/resource/"+this.oldURL;
    		var pageURL="products.json";
    		$http.get(pageURL).success(function(data){
      	console.log("Successful connections with server");
      	storage.llis=data;
      	storage.faqs=storage.llis.filter(faqFilter);
      	storage.codes=storage.llis.filter(codeFilter);
      	storage.videos=storage.llis.filter(videoFilter);
      	storage.audios=storage.llis.filter(audioFilter);
      	storage.slides=storage.llis.filter(slidesFilter);
      	storage.tables=storage.llis.filter(tableFilter);
      	storage.texts=storage.llis.filter(textFilter);
    	})
    	.error(function(data){
    	console.log("Connection with server failed");
    	});
    	};
  	}]);
    
    app.controller('expandCtrl', ['$scope', function($scope) {
        this.displayJSON = function(lli) {
            var table=document.getElementById("displayTable");
            table.innerHTML="";

            var row=table.insertRow(0);
            var cell1=row.insertCell(0);
            var cell2=row.insertCell(1);
            cell1.innerHTML="Title";
            cell2.innerHTML=lli["dcterms:title"]["@value"];

            row=table.insertRow(1);
            cell1=row.insertCell(0);
            cell2=row.insertCell(1);
            cell1.innerHTML="Description";
            cell2.innerHTML=lli["lom:description"]["dcterms:description"]["@value"];

            row=table.insertRow(2);
            cell1=row.insertCell(0);
            cell2=row.insertCell(1);
            cell1.innerHTML="Source";
            cell2.innerHTML=lli["lom:identifier"]["dcterms:identifier"]["@id"];

            row=table.insertRow(3);
            cell1=row.insertCell(0);
            cell2=row.insertCell(1);
            cell1.innerHTML="Catalog";
            cell2.innerHTML=lli["lom:identifier"]["lom:identifierCatalog"];            
        };

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

	const FAQ='faq';
	const CODE='code';
	const VIDEO='video';
	const AUDIO='audio';
	const SLIDES='slides';
	const TABLE='table';
	const NARRATIVE_TEXT='narrative text';

})();