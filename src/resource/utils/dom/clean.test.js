import cheerio from 'cheerio';

import clean from './clean';

describe('clean($)', () => {
  it('removes script elements', () => {
    const html = "<div><script>alert('hi')</script></div>";
    const $ = cheerio.load(html);

    expect(clean($).html()).toEqual('<div></div>');
  });

  it('removes style elements', () => {
    const html = '<div><style>foo: {color: red;}</style></div>';
    const $ = cheerio.load(html);

    expect(clean($).html()).toEqual('<div></div>');
  });

  it('removes comments', () => {
    const html = '<div>HI <!-- This is a comment --></div>';
    const $ = cheerio.load(html);

    expect(clean($).html()).toEqual('<div>HI </div>');
  });
});
