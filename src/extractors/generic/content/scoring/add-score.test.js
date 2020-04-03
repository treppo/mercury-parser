import cheerio from 'cheerio';

import { addScore, getScore } from './index';

describe('Scoring utils', () => {
  describe('addScore(node, $, amount)', () => {
    it("adds the specified amount to a node's score", () => {
      const $ = cheerio.load('<p score="25">Foo</p>');
      let $node = $('p').first();

      $node = addScore($node, $, 25);
      expect(getScore($node)).toEqual(50);
    });

    it('adds score if score not yet set (assumes score is 0)', () => {
      const $ = cheerio.load('<p>Foo</p>');
      let $node = $('p').first();

      $node = addScore($node, $, 25);
      expect(getScore($node)).toEqual(25);
    });
  });
});
