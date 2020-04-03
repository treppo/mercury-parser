import mergeSupportedDomains from './merge-supported-domains';

describe('mergeSupportedDomains(extractor, domains)', () => {
  it('returns an object w/domains as keys and extractor as value', () => {
    const extractor = {
      domain: 'foo.com',
      supportedDomains: ['example.com'],
    };
    const expected = {
      'foo.com': extractor,
      'example.com': extractor,
    };

    const result = mergeSupportedDomains(extractor);
    expect(result).toEqual(expected);
  });

  it('returns an object w/single domain if no supportedDomains', () => {
    const extractor = {
      domain: 'foo.com',
    };
    const expected = {
      'foo.com': extractor,
    };

    const result = mergeSupportedDomains(extractor);
    expect(result).toEqual(expected);
  });
});
