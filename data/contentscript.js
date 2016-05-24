var allDivs = document.getElementsByTagName('div');

if (allDivs.mainplugindiv)
{
  alert("!!! Plugin LLIBrowser is running !!!");
}
else
{
  var angularScript=document.createElement('script');
  angularScript.type='text/javascript';
  angularScript.src=self.options.angularLib;

  var appScript=document.createElement('script');
  appScript.type='text/javascript';
  appScript.src=self.options.angularApp;
  
  var head=document.getElementsByTagName('head')[0];
  head.appendChild(angularScript);
  head.appendChild(appScript);
  
  var div = document.createElement('div');
  div.id='mainplugindiv';

  document.body.insertBefore(div,document.body.firstChild);
  $("#mainplugindiv").html(self.options.divContent);
}