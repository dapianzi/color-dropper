<template>
  <div>
    <a-card title="Take a screenshot" style="width: 300px;">
      <a-button type="primary" @click="capture">Screen shot</a-button>
    </a-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            id: 100
        };
    },
    mounted: function() {
        var vm = this;
        // chrome.runtime.getBackgroundPage(function(win){
        //     console.log(win);
        // })
    },
    methods: {
        capture: function() {
            var vm = this;
            
            // see [https://developer.chrome.com/extensions/tabs#method-captureVisibleTab]
            chrome.tabs.captureVisibleTab({format: 'png'}, function(screenshotUrl) {
                // convert relative url to absolute url
                var viewTabUrl = chrome.extension.getURL('screenshot/screenshot.html?id=' + vm.id++);
                var targetId = null;

                chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
                    // We are waiting for the tab we opened to finish loading.
                    // Check that the tab's id matches the tab we opened,
                    // and that the tab is done loading.
                    if (tabId != targetId || changedProps.status != 'complete') return;

                    // Passing the above test means this is the event we were waiting for.
                    // There is nothing we need to do for future onUpdated events, so we
                    // use removeListner to stop getting called when onUpdated events fire.
                    chrome.tabs.onUpdated.removeListener(listener);

                    // Look through all views to find the window which will display
                    // the screenshot.  The url of the tab which will display the
                    // screenshot includes a query parameter with a unique id, which
                    // ensures that exactly one view will have the matching URL.
                    var views = chrome.extension.getViews();
                    for (var i = 0; i < views.length; i++) {
                        var view = views[i];
                        if (view.location.href == viewTabUrl) {
                            // call function as window directly
                            // view.js_main.ini(screenshotUrl);
                            view.setImageUrl(screenshotUrl);
                            break;
                        }
                    }
                });

                chrome.tabs.create({ url: viewTabUrl }, function(tab) {
                    targetId = tab.id;
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
p {
    font-size: 20px;
}
</style>
