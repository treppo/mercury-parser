import assert from 'assert';

import scorePageInLink from './score-page-in-link';

describe('scorePageInLink(pageNum, isWp)', () => {
  it('returns 50 if link contains a page num', () => {
    expect(scorePageInLink(1, false)).toEqual(50);
  });

  it('returns 0 if link contains no page num', () => {
    expect(scorePageInLink(null, false)).toEqual(0);
  });

  it('returns 0 if page is wordpress', () => {
    expect(scorePageInLink(10, true)).toEqual(0);
  });
});
