import { ChromePluginPage } from './app.po';

describe('chrome-plugin App', () => {
  let page: ChromePluginPage;

  beforeEach(() => {
    page = new ChromePluginPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
