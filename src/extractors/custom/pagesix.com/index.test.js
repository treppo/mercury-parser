import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('PagesixComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://pagesix.com/2016/12/19/sofia-vergara-and-nick-loebs-embryo-drama-taking-a-detour/';
      const html = fs.readFileSync('./fixtures/pagesix.com/1482254007534.html');
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      expect(extractor.domain).toEqual(URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/pagesix.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      expect(title).toEqual(
        'Sofía Vergara and Nick Loeb’s embryo drama taking a detour'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/pagesix.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      expect(author).toEqual('Oli Coleman');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/pagesix.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      expect(date_published).toEqual('2016-12-20T00:08:44.000Z');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/pagesix.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      expect(lead_image_url).toEqual(
        'https://nyppagesix.files.wordpress.com/2016/12/sofia-vergara4.jpg?quality=90&strip=all&w=1200'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/pagesix.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.

      expect(first13).toEqual(
        'Nick Loeb and Sofia Vergara Shutterstock / Getty Images (Composite) In the latest'
      );
    });
  });
});
