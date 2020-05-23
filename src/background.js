console.log(chrome.extension.getViews());
function openSnapShot() {
	var jsonH_url = chrome.extension.getURL("snapshot/snapshot.html");
	chrome.tabs.create({"url":jsonH_url, "selected":true});
}

chrome.browserAction.onClicked.addListener(function( tab ) {
    console.log(tab);
	openSnapShot();
});
