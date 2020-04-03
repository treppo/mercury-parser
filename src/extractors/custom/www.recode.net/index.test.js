import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwRecodeNetExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.recode.net/2016/12/15/13971502/fcc-tom-wheeler-departure-net-neutrality-death-trump-layton';
      const html = fs.readFileSync(
        './fixtures/www.recode.net/1481841159344.html'
      );
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
      // in ./src/extractors/custom/www.recode.net/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      expect(title).toEqual(
        'FCC chairman Tom Wheeler’s departure is the death knell for net neutrality'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.recode.net/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      expect(author).toEqual('April Glaser');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.recode.net/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      expect(date_published).toEqual('2016-12-15T18:55:10.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.recode.net/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      expect(dek).toEqual('The FCC will now have a Republican majority.');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.recode.net/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      expect(lead_image_url).toEqual(
        'https://cdn0.vox-cdn.com/thumbor/vYSadgIaWQTfllNFgfisldW3AFA=/0x30:2166x1248/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/52310757/464506458.1481828109.jpeg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.recode.net/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      expect(first13).toEqual(
        'Photo by Mark Wilson/Getty Images U.S. Federal Communications Commission chairman Tom Wheeler announced'
      );
    });
  });
});
