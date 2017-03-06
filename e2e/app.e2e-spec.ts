import { MuskokaDiscoveryCenterPage } from './app.po';

describe('muskoka-discovery-center App', () => {
  let page: MuskokaDiscoveryCenterPage;

  beforeEach(() => {
    page = new MuskokaDiscoveryCenterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
