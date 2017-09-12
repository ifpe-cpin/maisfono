import { MaisFonoPage } from './app.po';

describe('mais-fono App', () => {
  let page: MaisFonoPage;

  beforeEach(() => {
    page = new MaisFonoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
