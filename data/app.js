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
	var app = angular.module('llibrowser', ['ng','ngSanitize']);

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
         *@var activeTabs
         *@type {Boolean[]}
         *@desc Array connected to the checkboxes in overlay.html
         *@default activeTabs[i]=true
         */
         storage.activeTabs=[true,true,true,true,true,true,true];
         storage.index=[0,0,0,0,0,0,0];

         /**
         *@var tab
         *@type {Integer}
         *@desc Value of a current tab
         *@default 1
         */
         storage.tab=1;

        /**
         *@var tabStyle
         *@type {String[]}
         *@desc Style values of the tabs
         *@default tabStyle[1]=ACTIVE_TAB_STYLE
         */
         storage.tabStyle = [
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
         *@function selectTab
         *@param {Integer} setTab
         *@return Sets the tab=setTab and changes the tabs' style
         */
         this.selectTab=function(setTab) {
             storage.tab=setTab;
             for (var i=0;i<7;i++)
             {
                if (i!=setTab-1)
                {
                   storage.tabStyle[i] = {
                      'background': NONACTIVE_TAB_STYLE
                  };
              }
              else {
                storage.tabStyle[setTab-1] = {
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
        page=page.replace("PSZP//","://");
    	/**
    	 *@var oldURL
    	 *@desc The current value of URL for LLIDelivery
    	 */
        this.oldURL = encodeURIComponent(page);

        function categoryFilter(cat) {
            return function(obj) {
                for (var i=0;i<obj["lom:educational"]["dcterms:type"].length;++i) {
                 var cmp = obj["lom:educational"]["dcterms:type"][i]["rdf:label"].trim().toLowerCase();
                 if ( cmp == FAQ || cmp == CODE || cmp == VIDEO || cmp == AUDIO 
                    || cmp == SLIDES || cmp == TABLE || cmp == NARRATIVE_TEXT) 
                 {
                    if (cmp == cat)
                       return true;
                   else
                       return false;
               }
           }
           return false;
       }
   }


   this.moveIndex=function(oldValue, step, upbound)
   {
    if (oldValue+step<0)
        return 0;
    if (oldValue+step>=upbound)
        return upbound-1;
    else
        return oldValue+step;
};

    	//var pageURL="http://localhost:3000/resource/"+this.oldURL;
    	var pageURL="products.json";
    	$http.get(pageURL).success(function(data){
         console.log("Successful connection with server");
         storage.llis=data;											//server: storage.llis=new Array(data);
         															//works for one llis
         															//TODO: if works with many, probably not
         storage.faqs=storage.llis.filter(categoryFilter(FAQ));
         storage.codes=storage.llis.filter(categoryFilter(CODE));
         storage.videos=storage.llis.filter(categoryFilter(VIDEO));
         storage.audios=storage.llis.filter(categoryFilter(AUDIO));
         storage.slides=storage.llis.filter(categoryFilter(SLIDES));
         storage.tables=storage.llis.filter(categoryFilter(TABLE));
         storage.texts=storage.llis.filter(categoryFilter(NARRATIVE_TEXT));

         storage.activeTabs[0]=storage.faqs.length!=0;
         storage.activeTabs[1]=storage.codes.length!=0;
         storage.activeTabs[2]=storage.videos.length!=0;
         storage.activeTabs[3]=storage.audios.length!=0;
         storage.activeTabs[4]=storage.slides.length!=0;
         storage.activeTabs[5]=storage.tables.length!=0;
         storage.activeTabs[6]=storage.texts.length!=0;

         for (var i=0;i<6;++i)
         {
            if (storage.activeTabs[i])
            {
                storage.selectTab(i+1);
                break;
            }
        }

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
             console.log("Successful connection with server");
             storage.llis=data;
             storage.faqs=storage.llis.filter(categoryFilter(FAQ));
             storage.codes=storage.llis.filter(categoryFilter(CODE));
             storage.videos=storage.llis.filter(categoryFilter(VIDEO));
             storage.audios=storage.llis.filter(categoryFilter(AUDIO));
             storage.slides=storage.llis.filter(categoryFilter(SLIDES));
             storage.tables=storage.llis.filter(categoryFilter(TABLE));
             storage.texts=storage.llis.filter(categoryFilter(NARRATIVE_TEXT));
             storage.activeTabs[0]=storage.faqs.length!=0;
             storage.activeTabs[1]=storage.codes.length!=0;
             storage.activeTabs[2]=storage.videos.length!=0;
             storage.activeTabs[3]=storage.audios.length!=0;
             storage.activeTabs[4]=storage.slides.length!=0;
             storage.activeTabs[5]=storage.tables.length!=0;
             storage.activeTabs[6]=storage.texts.length!=0;
             for (var i=0;i<6;++i)
             {
                if (storage.activeTabs[i])
                {
                    storage.selectTab(i+1);
                    break;
                }
            }
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