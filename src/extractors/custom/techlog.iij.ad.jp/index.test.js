import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('TechlogIijAdJpExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'http://techlog.iij.ad.jp/archives/2562';
      const html = fs.readFileSync(
        './fixtures/techlog.iij.ad.jp/1556573200354.html'
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
      // in ./src/extractors/custom/techlog.iij.ad.jp/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      expect(title).toEqual(
        `2019年のスマホ・DNSフィルタリング・スマホ政策 (IIJmio meeting 23資料公開)`
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/techlog.iij.ad.jp/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      expect(author).toEqual(`doumae`);
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/techlog.iij.ad.jp/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      expect(date_published).toEqual(`2019-04-13T07:08:44.000Z`);
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/techlog.iij.ad.jp/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      expect(dek).toEqual(null);
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/techlog.iij.ad.jp/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      expect(lead_image_url).toEqual(
        `http://techlog.iij.ad.jp/images/og-icon.png`
      );
    });

    it('returns the pages_rendered', async () => {
      // To pass this test, fill out the pages_rendered selector
      // in ./src/extractors/custom/techlog.iij.ad.jp/index.js.
      const { pages_rendered } = await result;

      // Update these values with the expected values from
      // the article.
      expect(pages_rendered).toBeUndefined();
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/techlog.iij.ad.jp/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 2);

      // Update these values with the expected values from
      // the article.
      expect(first13).toEqual('IIJmio meetingの発表資料を公開します。');
    });
  });
});
