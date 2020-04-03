import cheerio from 'cheerio';

import { addToParent, getScore } from './index';

describe('Scoring utils', () => {
  describe('addToParent(node, $, amount)', () => {
    it("adds 1/4 of a node's score it its parent", () => {
      const html = '<div score="25"><p score="40">Foo</p></div>';
      const $ = cheerio.load(html);
      let $node = $('p').first();

      $node = addToParent($node, $, 40);

      expect(getScore($node.parent())).toEqual(35);
      expect(getScore($node)).toEqual(40);
    });
  });
});
