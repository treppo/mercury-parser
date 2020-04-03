import assert from 'assert';

import { scoreCommas } from './index';

describe('Scoring utils', () => {
  describe('scoreCommas(text)', () => {
    it('returns 0 if text has no commas', () => {
      expect(scoreCommas('Foo bar')).toEqual(0);
    });

    it('returns a point for every comma in the text', () => {
      expect(scoreCommas('Foo, bar')).toEqual(1);
      expect(scoreCommas('Foo, bar, baz')).toEqual(2);
      expect(scoreCommas('Foo, bar, baz, bat')).toEqual(3);
    });
  });
});
