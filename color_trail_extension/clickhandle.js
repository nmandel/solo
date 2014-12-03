chrome.browserAction.onClicked.addListener(function(tab) {
	localStorage['magnitude'] = localStorage['magnitude'] || 100;

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getMag")
      sendResponse({status: localStorage['magnitude']});
    else
      sendResponse({}); 
  });

  console.log('Making ' + tab.url + ' colors!');
  chrome.tabs.executeScript(null, {file: "jquery.js"}, function() {
    chrome.tabs.executeScript(null, {file: "d3.js"}, function() {
		  chrome.tabs.executeScript(null, {file: "trail.js"});
		})
	})
});