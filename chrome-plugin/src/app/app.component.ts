/// <reference types="chrome" />

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mule';

  interceptClick() {
    console.log( 'Clicked Intercept');
    chrome.webRequest.onBeforeRequest.addListener(this.requestProcessor);
  }

  requestProcessor(details) {
    console.log(details);
  }
}
