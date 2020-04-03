import assert from 'assert';

import cleanAuthor from './author';

describe('cleanAuthor(author)', () => {
  it('removes the By from an author string', () => {
    const author = cleanAuthor('By Bob Dylan');

    expect(author).toEqual('Bob Dylan');
  });

  it('trims trailing whitespace and line breaks', () => {
    const text = `
      written by
      Bob Dylan
    `;
    const author = cleanAuthor(text);

    expect(author).toEqual('Bob Dylan');
  });
});
