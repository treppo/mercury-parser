import cheerio from 'cheerio';

import HTML from './fixtures/html';
import cleanTitle from './title';

describe('cleanTitle(title, { url, $ })', () => {
  it('only uses h1 if there is only one on the page', () => {
    const title = 'Too Short';
    const $ = cheerio.load(HTML.docWith2H1s);

    expect(cleanTitle(title, { url: '', $ })).toEqual(title);
  });

  it('removes HTML tags from titles', () => {
    const $ = cheerio.load(HTML.docWithTagsInH1.before);
    const title = $('h1').html();

    expect(cleanTitle(title, { url: '', $ })).toEqual(
      HTML.docWithTagsInH1.after
    );
  });

  it('trims extraneous spaces', () => {
    const title = " This Is a Great Title That You'll Love ";
    const $ = cheerio.load(HTML.docWithTagsInH1.before);

    expect(cleanTitle(title, { url: '', $ })).toEqual(title.trim());
  });
});
