import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwThevergeComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'http://www.theverge.com/2016/11/29/13774648/fcc-att-zero-rating-directv-net-neutrality-vs-tmobile';
      const html = fs.readFileSync(
        './fixtures/www.theverge.com/1480520999617.html'
      );
      result = Mercury.parse(url, { html, fallback: false });
    });

    it('is selected properly', async () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      expect(extractor.domain).toEqual(URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      // To pass this test, fill out the title selector
      // in ./src/extractors/custom/www.theverge.com/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      expect(title).toEqual(
        'AT&T just declared war on an open internet (and us)'
      );
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/www.theverge.com/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      expect(author).toEqual('T.C. Sottek');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/www.theverge.com/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      expect(date_published).toEqual('2016-11-29T15:00:19.000Z');
    });

    it('returns the dek', async () => {
      // To pass this test, fill out the dek selector
      // in ./src/extractors/custom/www.theverge.com/index.js.
      const { dek } = await result;

      // Update these values with the expected values from
      // the article.
      expect(dek).toEqual('‘Mobilizing Your World’ sounds like a threat now');
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/www.theverge.com/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      expect(lead_image_url).toEqual(
        'https://cdn0.vox-cdn.com/thumbor/v7kU2cISjo-wm6XceGk_kBuMBlA=/0x16:1024x592/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/52042639/vrg_tc_attarmy_1024.1480431618.jpeg'
      );
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/www.theverge.com/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      expect(first13).toEqual(
        'Last year we won the open internet back, but the new regulations had'
      );
      expect($('.e-image--hero').length).toEqual(1);
    });
  });
  it('returns the content from a feature', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.theverge.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html = fs.readFileSync(
      './fixtures/www.theverge.com/1480526003318.html'
    );
    const url =
      'http://www.theverge.com/2016/10/31/13478080/microsoft-surface-studio-design-engineering-interview';

    const { content } = await Mercury.parse(url, { html, fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    expect(first13).toEqual(
      'Microsoft’s Surface PCs are known for their hinges. From the first, launched alongside'
    );
  });
});
