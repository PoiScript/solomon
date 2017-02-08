import { SolomonPage } from './app.po';

describe('solomon App', function() {
  let page: SolomonPage;

  beforeEach(() => {
    page = new SolomonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
