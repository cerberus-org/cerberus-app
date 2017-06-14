import { CerberusAppPage } from './app.po';

describe('cerberus-app App', () => {
  let page: CerberusAppPage;

  beforeEach(() => {
    page = new CerberusAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
