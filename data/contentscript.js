var allDivs = document.getElementsByTagName('div');
if (allDivs.mainplugindiv)
{
  alert("!!! Plugin LLIBrowser is running !!!");
}
else
{
  var div = document.createElement('div');
  div.id='mainplugindiv';
  div.style.width = '100%';
    div.style.height = '150px';
    div.style.background = '#313192';
    div.style.color = 'white';
    div.innerHTML="<script type=\"text/javascript\" src="+self.options.angularLib+"></script>"+
    "<script type=\"text/javascript\" src="+self.options.angularApp+"></script>"+
      "<form style=\"margin: 0 auto; left: 10px; top: 50px; width: 98%;align: middle; visibility: visible\">"+
        "<label for=\"video\" style=\"color: white\"> <input type=\"checkbox\" checked=\"checked\" name=\"video\" value=\"video\" id=\"video\" /> Video</label>"+
        "<label for=\"forum\" style=\"color: white\"> <input type=\"checkbox\" checked=\"checked\" name=\"forum\" value=\"forum\" id=\"forum\" /> Forum</label>"+
        "<img src="+self.options.closeImg+" alt=\"Help\" style=\"width:20px;height:20px;\" align=right>"+
        "<img src="+self.options.helpImg+" alt=\"Close\" style=\"width:20px;height:20px;\" align=right onclick=\"alert('Hello')\">"+
      "</form>"+
      "<div style=\"margin: 0 auto; left: 10px; top: 50px; width: 98%; height: 50%; align: middle; background-color:#75bbf7; visibility: visible\">"+
        "<div ng-show=\"tab == 1\">"+
          "<form>"+
            "<h3 style=\"color: white; align: center\">Video1 Video2 Video3 Video4</h3>"+
          "</form>"+
        "</div>"+
        "<div ng-show=\"tab == 2\">"+
          "<form>"+
            "<h3 style=\"color: white; align: center\">Forum1 Forum2 Forum3 Forum4</h3>"+
          "</form>"+
        "</div>"+
      "</div>"+
      "<form style=\"margin: 0 auto; left: 10px; top: 50px; width: 98%;align: middle; background-color:#313192; visibility: visible\">"+
      "<a href=\"#video\" style=\"color: white; background-color: #75bbf7; height: 15px; padding: 5 auto\" ng-click=\"tab = 1\">Video</a>"+
      "<a href=\"#forum\" style=\"color: white; background-color: #313192; height: 15px; padding: 5 auto\" ng-click=\"tab = 2\">Forum</a>"+
      "</form>";
    document.body.insertBefore(div,document.body.firstChild);
}