import addExtractor from './add-extractor';

describe('addExtractor(extractor)', () => {
  it('can add multiple custom extractors', () => {
    addExtractor({ domain: 'www.site1.com' });
    addExtractor({ domain: 'www.site2.com' });
    const result = addExtractor({ domain: 'www.site3.com' });
    expect(Object.keys(result).length).toEqual(3);
  });

  it('returns error if an extractor is not provided', () => {
    const result = addExtractor();
    expect(result.error).toEqual(true);
  });

  it('returns error if a domain key is not included within the custom extractor', () => {
    const result = addExtractor({ test: 'abc' });
    expect(result.error).toEqual(true);
  });
});
