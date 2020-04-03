import cheerio from 'cheerio';
import assert from 'assert';

import { assertClean } from 'test-helpers';

import HTML from './fixtures/html';
import rewriteTopLevel from './rewrite-top-level';

describe('rewriteTopLevel(node, $)', () => {
  it('turns html and body tags into divs', () => {
    const $ = cheerio.load(HTML.rewriteHTMLBody.before);
    const result = rewriteTopLevel($('html').first(), $);

    expect(result('html').length).toEqual(0);
    expect(result('body').length).toEqual(0);

    assertClean(result.html(), HTML.rewriteHTMLBody.after);
  });
});
