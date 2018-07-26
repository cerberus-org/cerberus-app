import { browser, by, element } from 'protractor';

export class CerberusAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('core-core h1')).getText();
  }
}
