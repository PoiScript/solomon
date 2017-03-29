import {browser, element, by} from 'protractor';

export class SolomonPage {
  navigateTo () {
    return browser.get('/');
  }

  getParagraphText () {
    return element(by.css('solomon-root h1')).getText();
  }
}
