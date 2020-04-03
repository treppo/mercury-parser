import cheerio from 'cheerio';

import HTML from './fixtures/html';
import GenericTitleExtractor from './extractor';

describe('GenericTitleExtractor', () => {
  describe('extract({ $, url, cachedMeta })', () => {
    it('extracts strong meta title tags', () => {
      const $ = cheerio.load(HTML.dcTitle.test);
      const result = GenericTitleExtractor.extract({
        $,
        url: '',
        metaCache: ['dc.title', 'something-else'],
      });

      expect(result).toEqual(HTML.dcTitle.result);
    });

    it('pulls title from selectors lacking string meta', () => {
      const $ = cheerio.load(HTML.strongTitleSelector.test);
      const result = GenericTitleExtractor.extract({
        $,
        url: '',
        metaCache: ['og:title', 'something-else'],
      });

      expect(result).toEqual(HTML.ogTitle.result);
    });

    it('then falls back to weak meta title tags', () => {
      const $ = cheerio.load(HTML.ogTitle.test);
      const result = GenericTitleExtractor.extract({
        $,
        url: '',
        metaCache: ['og:title', 'something-else'],
      });

      expect(result).toEqual(HTML.ogTitle.result);
    });
  });

  it('then falls back to weak selectors', () => {
    const $ = cheerio.load(HTML.weakTitleSelector.test);
    const result = GenericTitleExtractor.extract({ $, url: '', metaCache: [] });

    expect(result).toEqual(HTML.weakTitleSelector.result);
  });
});
