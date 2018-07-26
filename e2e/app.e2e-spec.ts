import { CerberusAppPage } from './app.po';

describe('cerberus-core App', () => {
  let page: CerberusAppPage;

  beforeEach(() => {
    page = new CerberusAppPage();
  });

  it('should display login message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to core!!');
  });
});
