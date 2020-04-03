import assert from 'assert';

import resolveSplitTitle from './resolve-split-title';

describe('resolveSplitTitle(text)', () => {
  it('does nothing if title not splittable', () => {
    const title = 'This Is a Normal Title';

    expect(resolveSplitTitle(title)).toEqual(title);
  });

  it('extracts titles from breadcrumb-like titles', () => {
    const title = 'The Best Gadgets on Earth : Bits : Blogs : NYTimes.com';

    expect(resolveSplitTitle(title)).toEqual('The Best Gadgets on Earth ');
  });

  it('cleans domains from titles at the front', () => {
    const title = 'NYTimes - The Best Gadgets on Earth';
    const url = 'https://www.nytimes.com/bits/blog/etc/';

    expect(resolveSplitTitle(title, url)).toEqual('The Best Gadgets on Earth');
  });

  it('cleans domains from titles at the back', () => {
    const title = 'The Best Gadgets on Earth | NYTimes';
    const url = 'https://www.nytimes.com/bits/blog/etc/';

    expect(resolveSplitTitle(title, url)).toEqual('The Best Gadgets on Earth');
  });
});
