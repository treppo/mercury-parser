import scoreNextLinkText from './score-next-link-text';

describe('scoreNextLinkText(linkData)', () => {
  it('returns 50 if contains common next link text', () => {
    const linkData = 'foo bar Next page';

    expect(scoreNextLinkText(linkData)).toEqual(50);
  });

  it('returns 0 if does not contain common next link text', () => {
    const linkData = 'foo bar WOW GREAT';

    expect(scoreNextLinkText(linkData)).toEqual(0);
  });
});
