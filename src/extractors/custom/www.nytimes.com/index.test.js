import assert from 'assert';
import cheerio from 'cheerio';
import URL from 'url';

import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';
import Mercury from 'mercury';

const fs = require('fs');

describe('NYTimesExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://www.nytimes.com/2016/09/20/nyregion/nyc-nj-explosions-ahmad-khan-rahami.html';
      const html = fs.readFileSync(
        './fixtures/www.nytimes.com/1571224616991.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // To pass this test, rename your extractor in
      // ./src/extractors/custom/www.nytimes.com/index.js
      // (e.g., CustomExtractor => NYTimesExtractor)
      // then add your new extractor to
      // src/extractors/all.js
      const extractor = getExtractor(url);
      expect(extractor.domain).toEqual(URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      expect(title).toEqual(
        'Ahmad Khan Rahami Is Arrested in Manhattan and New Jersey Bombings'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      expect(author).toEqual(
        'Marc Santora, William K. Rashbaum, Al Baker and Adam Goldman'
      );
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      expect(date_published).toEqual('2016-09-19T11:46:01.000Z');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      expect(lead_image_url).toEqual(
        'https://static01.nyt.com/images/2016/09/20/nyregion/Manhunt/Manhunt-facebookJumbo-v2.jpg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.nytimes.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      expect(first13).toEqual(
        'The man who the police said sowed terror across two states, setting off'
      );
    });
  });

  it('works with a feature story', async () => {
    const html = fs.readFileSync(
      './fixtures/www.nytimes.com/1571223287888.html'
    );
    const uri =
      'http://www.nytimes.com/interactive/2016/09/15/arts/design/national-museum-of-african-american-history-and-culture.html';

    const { content, title, author } = await Mercury.parse(uri, { html });
    const $ = cheerio.load(content);
    const text = excerptContent($('*').first().text(), 13);

    expect(title).toEqual('I, Too, Sing America');
    expect(author).toEqual('The New York Times');
    expect(text).toEqual(
      'T he Smithsonian’s National Museum of African American History and Culture opens on'
    );
  });

  it('returns the title on most recent articles', async () => {
    const html = fs.readFileSync(
      './fixtures/www.nytimes.com/1571223477873.html'
    );
    const uri =
      'https://www.nytimes.com/2018/10/09/us/politics/nikki-haley-united-nations.html';

    const { title } = await Mercury.parse(uri, { html });

    expect(title).toEqual(
      'Nikki Haley to Resign as Trump’s Ambassador to the U.N.'
    );
  });
});
