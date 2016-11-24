import { JudgetoolboxPage } from './app.po';

describe('judgetoolbox App', function() {
  let page: JudgetoolboxPage;

  beforeEach(() => {
    page = new JudgetoolboxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
