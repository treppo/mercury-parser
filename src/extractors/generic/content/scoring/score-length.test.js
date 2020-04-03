import assert from 'assert';

import { scoreLength } from './index';

describe('Scoring utils', () => {
  describe('scoreLength(textLength, tagName)', () => {
    it('returns 0 if length < 50 chars', () => {
      expect(scoreLength(30)).toEqual(0);
    });

    it('returns varying scores but maxes out at 3', () => {
      expect(scoreLength(150)).toEqual(1);
      expect(scoreLength(199)).toEqual(1.98);
      expect(scoreLength(200)).toEqual(2);
      expect(scoreLength(250)).toEqual(3);
      expect(scoreLength(500)).toEqual(3);
      expect(scoreLength(1500)).toEqual(3);
    });
  });
});
