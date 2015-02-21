// click listener for color trail icon
chrome.browserAction.onClicked.addListener(function(tab) {
	localStorage['magnitude'] = localStorage['magnitude'] || 100;
  // allows explosion magnitude to be set via options
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getMag")
      sendResponse({status: localStorage['magnitude']});
    else
      sendResponse({}); 
  });

  console.log('Making ' + tab.url + ' colors!');

  // runs our essential scripts through the extension in callback hell :)
  chrome.tabs.executeScript(null, {file: "lib/jquery.js"}, function() {
    chrome.tabs.executeScript(null, {file: "lib/d3.js"}, function() {
		  chrome.tabs.executeScript(null, {file: "trail.js"});
		})
	})
});