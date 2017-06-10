import { NgPinterestLayoutPage } from './app.po';

describe('ng-pinterest-layout App', () => {
  let page: NgPinterestLayoutPage;

  beforeEach(() => {
    page = new NgPinterestLayoutPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
