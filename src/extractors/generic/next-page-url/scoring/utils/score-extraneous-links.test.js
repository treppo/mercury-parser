import scoreExtraneousLinks from './score-extraneous-links';

describe('scoreExtraneousLinks(href)', () => {
  it('returns -25 if link matches extraneous text', () => {
    const url = 'http://example.com/email-link';

    expect(scoreExtraneousLinks(url)).toEqual(-25);
  });

  it('returns 0 if does not match extraneous text', () => {
    const url = 'http://example.com/asdf';

    expect(scoreExtraneousLinks(url)).toEqual(0);
  });
});
