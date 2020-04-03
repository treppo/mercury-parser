import cheerio from 'cheerio';

import HTML from './fixtures/get-weight';
import { getWeight } from './index';

describe('Generic Extractor Utils', () => {
  describe('getWeight(node)', () => {
    it('returns a score of 25 if node has positive id', () => {
      const $ = cheerio.load(HTML.positiveId);
      expect(getWeight($('div'))).toEqual(25);
    });

    it('returns a score of -25 if node has negative id', () => {
      const $ = cheerio.load(HTML.negativeId);
      expect(getWeight($('div'))).toEqual(-25);
    });

    it('returns a score of 25 if node has positive class', () => {
      const $ = cheerio.load(HTML.positiveClass);
      expect(getWeight($('div'))).toEqual(25);
    });

    it('returns a score of -25 if node has negative class', () => {
      const $ = cheerio.load(HTML.negativeClass);
      expect(getWeight($('div'))).toEqual(-25);
    });

    it('returns a score of 25 if node has both positive id and class', () => {
      const $ = cheerio.load(HTML.positiveIdAndClass);
      expect(getWeight($('div'))).toEqual(25);
    });

    it('returns a score of 25 if node has pos id and neg class', () => {
      // is this really wanted? id="entry" class="adbox"
      // should get positive score?
      const $ = cheerio.load(HTML.positiveIdNegClass);
      expect(getWeight($('div'))).toEqual(25);
    });

    it('returns a score of 10 if node has pos img class', () => {
      const $ = cheerio.load(HTML.positivePhotoClass);
      expect(getWeight($('div'))).toEqual(10);
    });

    it('returns a score of 35 if node has pos id pos img class', () => {
      const $ = cheerio.load(HTML.positiveIdAndPhoto);
      expect(getWeight($('div'))).toEqual(35);
    });

    it("adds an add'l 25 (total 50) if node uses entry-content-asset class", () => {
      const $ = cheerio.load(HTML.entryContentAsset);
      expect(getWeight($('div'))).toEqual(50);
    });
  });
});
