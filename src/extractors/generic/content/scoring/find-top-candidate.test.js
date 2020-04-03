import assert from 'assert';
import cheerio from 'cheerio';

import HTML from './fixtures/html';

import { findTopCandidate, getScore, scoreContent } from './index';

const fs = require('fs');

describe('findTopCandidate($)', () => {
  it('finds the top candidate from simple case', () => {
    const $ = cheerio.load(HTML.findDom1);

    const $$topCandidate = findTopCandidate($);

    expect(getScore($$topCandidate)).toEqual(100);
  });

  it('finds the top candidate from a nested case', () => {
    const $ = cheerio.load(HTML.findDom2);

    const $$topCandidate = findTopCandidate($);

    // this is wrapped in a div so checking
    // the score of the first child
    expect(getScore($$topCandidate.first())).toEqual(50);
  });

  it('ignores tags like BR', () => {
    const $ = cheerio.load(HTML.findDom3);

    const $topCandidate = findTopCandidate($);

    expect(getScore($topCandidate)).toEqual(50);
  });

  it('returns BODY if no candidates found', () => {
    const $ = cheerio.load(HTML.topBody);

    const $topCandidate = findTopCandidate($);

    expect($topCandidate.get(0).tagName).toEqual('body');
  });

  it('appends a sibling with a good enough score', () => {
    const html = fs.readFileSync('./fixtures/latimes.html', 'utf-8');

    let $ = cheerio.load(html);
    $ = scoreContent($);

    const $topCandidate = findTopCandidate($);
    expect($($topCandidate).text().length).toEqual(3652);
  });
});
