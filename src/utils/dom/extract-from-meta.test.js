import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/extract-from-selectors';
import { extractFromMeta } from './index';

describe('extractFromMeta($, metaNames, cachedNames, cleanTags)', () => {
  it('extracts an arbitrary meta tag by name', () => {
    const $ = cheerio.load(HTML.metaFoo.test);
    const result = extractFromMeta($, ['foo', 'baz'], ['foo', 'bat']);

    expect(result).toEqual(HTML.metaFoo.result);
  });

  it('returns nothing if a meta name is duplicated', () => {
    const $ = cheerio.load(HTML.metaDupes.test);
    const result = extractFromMeta($, ['foo', 'baz'], ['foo', 'bat']);

    expect(result).toEqual(HTML.metaDupes.result);
  });

  it('ignores duplicate meta names with empty values', () => {
    const $ = cheerio.load(HTML.metaEmptyDupes.test);
    const result = extractFromMeta($, ['foo', 'baz'], ['foo', 'bat']);

    expect(result).toEqual(HTML.metaEmptyDupes.result);
  });
});
