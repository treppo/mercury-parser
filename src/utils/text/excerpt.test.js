import excerptContent from './excerpt-content';

describe('excerptContent(content, words)', () => {
  it('extracts the requested number of words from content', () => {
    const content = ' One  two three four five six, seven eight, nine, ten.';

    const three = excerptContent(content, 3);
    expect(three).toEqual('One two three');

    const ten = excerptContent(content, 10);
    expect(ten).toEqual(content.trim().replace(/\s+/, ' '));
  });
});
