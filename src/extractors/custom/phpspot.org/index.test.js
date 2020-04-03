import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('PhpspotOrgExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'http://phpspot.org/blog/archives/2019/04/treeviz.html';
      const html = fs.readFileSync('./fixtures/phpspot.org/1554622277068.html');
      result = Mercury.parse(url, {
        html,
        fallback: false,
      });
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
      // in ./src/extractors/custom/phpspot.org/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      expect(title).toEqual(`マインドマップ風のツリーを描画できる「Treeviz」`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/phpspot.org/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      expect(author).toEqual(null);
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/phpspot.org/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      expect(date_published).toEqual('2019-04-03T15:00:00.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/phpspot.org/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      expect(dek).toEqual(null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/phpspot.org/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      expect(lead_image_url).toEqual(null);
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/phpspot.org/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 2);

      // Update these values with the expected values from
      // the article.
      expect(first13).toEqual(
        'Treeviz マインドマップ風のツリーを描画できる「Treeviz」'
      );
    });
  });
});
