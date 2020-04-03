import scoreLinkText from './score-link-text';

describe('scoreLinkText(linkText)', () => {
  it('returns 8 if link contains the num 2', () => {
    expect(scoreLinkText('2', 0)).toEqual(8);
  });

  it('returns 5 if link contains the num 5', () => {
    expect(scoreLinkText('5', 0)).toEqual(5);
  });

  it('returns -30 if link contains the number 1', () => {
    expect(scoreLinkText('1', 0)).toEqual(-30);
  });

  it('penalizes -50 if pageNum is >= link text as num', () => {
    expect(scoreLinkText('4', 5)).toEqual(-44);
  });
});
