import { browser, by, element } from 'protractor';

export class CerberusAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('root-root h1')).getText();
  }
}
