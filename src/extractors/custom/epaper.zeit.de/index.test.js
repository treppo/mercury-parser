import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('EpaperZeitDeExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url =
        'https://epaper.zeit.de/article/702225a4061dfbf97ab93df8de77e8c54aa3f5fe7a8c2799e8d425953d123acf';
      const html = fs.readFileSync(
        './fixtures/epaper.zeit.de/1566927390034.html'
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
      // in ./src/extractors/custom/epaper.zeit.de/index.js.
      const { title } = await result;

      // Update these values with the expected values from
      // the article.
      expect(title).toEqual(`Was heißt Sozialismus für Sie, Kevin Kühnert?`);
    });

    it('returns the author', async () => {
      // To pass this test, fill out the author selector
      // in ./src/extractors/custom/epaper.zeit.de/index.js.
      const { author } = await result;

      // Update these values with the expected values from
      // the article.
      expect(author).toEqual('Politik · Jochen Bittner, Tina Hildebrandt');
    });

    it('returns the date_published', async () => {
      // To pass this test, fill out the date_published selector
      // in ./src/extractors/custom/epaper.zeit.de/index.js.
      const { date_published } = await result;

      // Update these values with the expected values from
      // the article.
      expect(date_published).toEqual(null);
    });

    it('returns the excerpt', async () => {
      // To pass this test, fill out the excerpt selector
      // in ./src/extractors/custom/epaper.zeit.de/index.js.
      const { excerpt } = await result;

      // Update these values with the expected values from
      // the article.
      expect(excerpt).toEqual(
        'Zum Beispiel die Kollektivierung von Firmen wie BMW, sagt der Chef der Jusos. In der Wirtschaftsordnung, die er sich vorstellt, gäbe es auch kein Eigentum an Wohnraum mehr. Ein Gespräch über eine radikale Alternative'
      );
    });

    it('returns the lead_image_url', async () => {
      // To pass this test, fill out the lead_image_url selector
      // in ./src/extractors/custom/epaper.zeit.de/index.js.
      const { lead_image_url } = await result;

      // Update these values with the expected values from
      // the article.
      expect(lead_image_url).toEqual(null);
    });

    it('returns the content', async () => {
      // To pass this test, fill out the content selector
      // in ./src/extractors/custom/epaper.zeit.de/index.js.
      // You may also want to make use of the clean and transform
      // options.
      const { content } = await result;

      const $ = cheerio.load(content || '');

      const first13 = excerptContent($('*').first().text(), 13);

      // Update these values with the expected values from
      // the article.
      expect(first13).toEqual(
        'Politik · Jochen Bittner, Tina Hildebrandt Zum Beispiel die Kollektivierung von Firmen wie'
      );
    });
  });
});
