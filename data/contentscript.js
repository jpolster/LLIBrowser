var allDivs = document.getElementsByTagName('div');

if (allDivs.mainplugindiv)
{
  alert("!!! Plugin LLIBrowser is running !!!");
}
else
{
  var div = document.createElement('div');
  div.id='mainplugindiv';
  
  
  document.body.insertBefore(div,document.body.firstChild);
  $("#mainplugindiv").html(self.options.divContent);
}