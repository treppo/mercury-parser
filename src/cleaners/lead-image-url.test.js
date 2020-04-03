import assert from 'assert';

import clean from './lead-image-url';

describe('clean(leadImageUrl)', () => {
  it('returns the url if valid', () => {
    const url = 'https://example.com';
    expect(clean(url)).toEqual(url);
  });

  it('returns null if the url is not valid', () => {
    const url = 'this is not a valid url';
    expect(clean(url)).toEqual(null);
  });

  it('trims whitespace', () => {
    const url = '  https://example.com/foo/bar.jpg';
    expect(clean(url)).toEqual(url.trim());
  });
});
