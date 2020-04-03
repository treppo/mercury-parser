import removeAnchor from './remove-anchor';

describe('removeAnchor(url)', () => {
  it('returns a url w/out #anchor', () => {
    const url = 'http://example.com/foo/bar/wow-cool/page=10/#wow';
    const cleaned = 'http://example.com/foo/bar/wow-cool/page=10';

    expect(removeAnchor(url)).toEqual(cleaned);
  });

  it('returns same url if url has no anchor found', () => {
    const url = 'http://example.com/foo/bar/wow-cool';
    const cleaned = 'http://example.com/foo/bar/wow-cool';

    expect(removeAnchor(url)).toEqual(cleaned);
  });
});
