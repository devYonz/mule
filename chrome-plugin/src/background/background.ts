/// <reference types="chrome" />

import tabId = chrome.devtools.inspectedWindow.tabId;

export class Background {
  private counter: number;
  constructor() {
    this.counter = 0;
    console.log('Background: Constructor starting.');
    this.boot();
  }
  static listener(details) {
    let url: String = details.url;
    let method: String = details.method;
    let tabId: number = details.tabId;

    if (tabId === undefined) {
      console.log(method + ' request to URL: ' + url);
      console.log(details)
    } else if ( tabId < 1){
      // TabId is -1 when dealing with extension requests
      console.log(method + ' internal request to URL: ' + url);
    } else {
      chrome.tabs.get(tabId, (tab) => {
        console.log(method + ' request to URL: ' + url + '\t\tfired from tab URL:' + tab.url);
      });
    }
  }

  static navigationListener(details){
    let url: String = details.url;
    console.log('\n\nNew nav requested: ' + url);
  }
  static navigationCompletedListener(details){
    let url: String = details.url;
    console.log('Completed navigation to requested' + url + '\n\n');
  }

  boot() {
    console.log('Background: Boot invoked, Starting logging');
    let filter: chrome.webRequest.RequestFilter;
    filter = {urls: ['<all_urls>']};
    chrome.webRequest.onBeforeRequest.addListener(Background.listener, filter);
    // Add a navigation listener
    // let navfilter: chrome.webNavigation.WebNavigationEventFilter;
    // navfilter = {url: ['<all_urls>']};
    chrome.webNavigation.onBeforeNavigate.addListener(Background.navigationListener)

    chrome.webNavigation.onCompleted.addListener(Background.navigationCompletedListener)
  }
  doWork() {
    console.log('Hello_Mule Work!' + this.counter);
    this.counter = this.counter + 1;
  }
}


(function() {
  let bg: Background = new Background();
})();
