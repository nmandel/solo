chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Making ' + tab.url + ' colors!');
  chrome.tabs.executeScript(null, 
  	{file: "jquery.js"},
  	function() {
  		chrome.tabs.executeScript(null, {file: "trail.js"});
  	}
  );
});