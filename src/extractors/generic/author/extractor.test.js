import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';
import GenericAuthorExtractor from './extractor';

describe('GenericAuthorExtractor', () => {
  describe('extract($, cachedMeta)', () => {
    it('extracts author from meta tags', () => {
      const $ = cheerio.load(HTML.authorMeta.test);
      const result = GenericAuthorExtractor.extract({
        $,
        metaCache: ['dc.author', 'something-else'],
      });

      expect(result).toEqual(HTML.authorMeta.result);
    });

    it('extracts author from author selectors', () => {
      const $ = cheerio.load(HTML.authorSelectors.test);
      const result = GenericAuthorExtractor.extract({
        $,
        metaCache: ['dc.author', 'something-else'],
      });

      expect(result).toEqual(HTML.authorSelectors.result);
    });

    it('extracts author with regex selectors', () => {
      const $ = cheerio.load(HTML.authorRegSelectors.test);
      const result = GenericAuthorExtractor.extract({
        $,
        metaCache: ['dc.author', 'something-else'],
      });

      expect(result).toEqual(HTML.authorRegSelectors.result);
    });

    it('returns null if no author found', () => {
      const $ = cheerio.load('<div></div>');
      const result = GenericAuthorExtractor.extract({
        $,
        metaCache: ['dc.author', 'something-else'],
      });

      expect(result).toEqual(null);
    });
  });
});
