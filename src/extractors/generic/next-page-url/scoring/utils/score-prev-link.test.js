import scorePrevLink from './score-prev-link';

describe('scorePrevLink(linkData)', () => {
  it('returns -200 if link matches previous text', () => {
    const linkData = 'foo next previous page';

    expect(scorePrevLink(linkData)).toEqual(-200);
  });

  it('returns 0 if does not match a prev link', () => {
    const linkData = 'foo bar WOW GREAT';

    expect(scorePrevLink(linkData)).toEqual(0);
  });
});
