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
 *@name ServerCtrl
 *@type angular.controller
 *@desc Controller that enables fetching .json from server and configuring the add-on page
 *@property {Boolean[]} activeTabs 			-ng-binding to the checkboxes
 *@property {Integer} tab 					-The initial value of active tab
 *@property {Object[]} tabStyle 			-Contains styles for the tabs
 *@property {Object[]} llis      			-The storage for data from server
 *@property {Object[]} faqs      			-The array of llis that belong to category FAQ
 *@property {Object[]} codes     			-The array of llis that belong to category CODE
 *@property {Object[]} videos     			-The array of llis that belong to category VIDEO
 *@property {Object[]} audios     			-The array of llis that belong to category AUDIO
 *@property {Object[]} slides     			-The array of llis that belong to category SLIDES
 *@property {Object[]} tables     			-The array of llis that belong to category TABLE
 *@property {Object[]} texts      			-The array of llis that belong to category NARRATIVE_TEXT
 *@property {Integer[]} index      			-The array of current first llis in gallery
 */
app.controller('ServerCtrl',['$http', function($http) {
 var storage=this;

 storage.activeTabs=[true,true,true,true,true,true,true];
 storage.tab=1;
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
     *@param {Integer} setTab the number of tab to be activated
     *@desc Sets the tab=setTab and changes the tabs' style
     */
     this.selectTab=function(setTab) {
         storage.tab=setTab;
         for (var i=0;i<7;i++)
         {
            if (i!=setTab-1)
            {
                storage.tabStyle[i] = {
                    'background' : NONACTIVE_TAB_STYLE,
                    'color': WHITE
                };
            }
            else {
                storage.tabStyle[setTab-1] = {
                    'background' : ACTIVE_TAB_STYLE,
                    'color': COLOR_ACTIVE_TAB_STYLE
                };
            }
        }
    };

    /**
     *@function isSelected
     *@param {Integer} checkTab the number of tab to be checked
     *@return true if this.tab = checkTab, else false
     */
     this.isSelected=function(checkTab) {
         return this.tab==checkTab;
     };

     storage.llis=[];
     storage.faqs=[];
     storage.codes=[];
     storage.videos=[];
     storage.audios=[];
     storage.slides=[];
     storage.tables=[];
     storage.texts=[];
     storage.index=[0,0,0,0,0,0,0];

   /**
     *@function categoryFilter
     *@param {String} cat The category for the filter (FAQ,CODE,VIDEO,AUDIO,SLIDES,TABLE,NARRATIVE_TEXT)
     *@return function that returns true if the lli belongs to cat
     */
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

    /**
     *@function formLLIS
     *@desc filters the llis, defines which tabs should be shown and activates the first tab with content
     */
     this.formLLIS = function() {
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

        for (var i=0;i<=6;++i)
        {
            if (storage.activeTabs[i])
            {
                storage.selectTab(i+1);
                break;
            }
        }
    };

    /**
*@function moveIndex
*@param {Integer} oldValue The current value of the index
*@param {Integer} step The step to change the current index
*@param {Integer} upbound The upperbound that cannot be broken (usually size of array)
*@desc Shifts the index and checks if the upper- and lower-bounds are not broken
*@return the new index
*/
this.moveIndex=function(oldValue, step, upbound)
{
if (oldValue+step<0)
    return 0;
if (oldValue+step>=upbound)
    return upbound-1;
else
    return oldValue+step;
};

var parameters = location.search.substring(1).split("&");
var temp = parameters[0].split("=");
var page = unescape(temp[1]);
page=page.replace("PSZP//","://");
this.oldURL = encodeURIComponent(page);

	// var pageURL="http://localhost:3000/resource/"+this.oldURL;
	var pageURL="products.json";
	$http.get(pageURL).success(function(data){
     console.log("Successful connection with server");
     if (data.length == undefined)
        storage.llis=new Array(data);
    else
        storage.llis=data;
    storage.formLLIS();										
})
	.error(function(data){
       console.log("Connection with server failed");
   });

   this.newURL="";
	/**
	 *@function setURL
	 *@desc Sets oldURL as newURL and resets the value of newURL
	 */
    this.setURL=function() {
      this.oldURL=encodeURIComponent(this.newURL);
      this.newURL="";
		//var pageURL="http://localhost:3000/resource/"+this.oldURL;
		var pageURL="products.json";
		$http.get(pageURL).success(function(data){
         console.log("Successful connection with server");
         if (data.length == undefined)
            storage.llis=new Array(data);
        else
            storage.llis=data;  
        storage.formLLIS();
    })
        .error(function(data){
           console.log("Connection with server failed");
       });
    };
    this.HTTP_REGEX = /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/;
}]);


/**
 *@name expandCtrl
 *@type angular.controller
 *@desc Controller that shows content of a single LLI in a table
 *@property {Object} table -The table "displayTable" from overlay.html
 */
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

 const ACTIVE_TAB_STYLE='#95caf7';
 const NONACTIVE_TAB_STYLE='rgb(73, 61, 191)';
 const WHITE='#ffffff';
 const COLOR_ACTIVE_TAB_STYLE='#387090'
 const FAQ='faq';
 const CODE='code';
 const VIDEO='video';
 const AUDIO='audio';
 const SLIDES='slides';
 const TABLE='table';
 const NARRATIVE_TEXT='narrative text';

})();