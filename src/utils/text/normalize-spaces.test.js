import cheerio from 'cheerio';

import HTML from './fixtures/html';

import { normalizeSpaces } from './index';

describe('normalizeSpaces(text)', () => {
  it('normalizes spaces from text', () => {
    const $ = cheerio.load(HTML.normalizeSpaces.before);

    const result = normalizeSpaces($('*').first().text());
    expect(result).toEqual(HTML.normalizeSpaces.after);
  });

  it('preserves spaces in preformatted text blocks', () => {
    const $ = cheerio.load(HTML.normalizeSpacesPreserve.before);

    const result = normalizeSpaces($.html());
    expect(result).toEqual(HTML.normalizeSpacesPreserve.after);
  });
});
