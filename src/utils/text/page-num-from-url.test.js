import assert from 'assert';

import pageNumFromUrl from './page-num-from-url';

describe('pageNumFromUrl(url)', () => {
  it('returns null if there is no page num in the url', () => {
    const url1 = 'http://example.com';
    expect(pageNumFromUrl(url1)).toEqual(null);

    const url2 = 'http://example.com/?pg=102';
    expect(pageNumFromUrl(url2)).toEqual(null);

    const url3 = 'http://example.com/?page:102';
    expect(pageNumFromUrl(url3)).toEqual(null);
  });

  it('returns a page num if one matches the url', () => {
    const url1 = 'http://example.com/foo?page=1';
    expect(pageNumFromUrl(url1)).toEqual(1);

    const url2 = 'http://example.com/foo?pg=1';
    expect(pageNumFromUrl(url2)).toEqual(1);

    const url3 = 'http://example.com/foo?p=1';
    expect(pageNumFromUrl(url3)).toEqual(1);

    const url4 = 'http://example.com/foo?paging=1';
    expect(pageNumFromUrl(url4)).toEqual(1);

    const url5 = 'http://example.com/foo?pag=1';
    expect(pageNumFromUrl(url5)).toEqual(1);

    const url6 = 'http://example.com/foo?pagination/1';
    expect(pageNumFromUrl(url6)).toEqual(1);

    const url7 = 'http://example.com/foo?paging/88';
    expect(pageNumFromUrl(url7)).toEqual(88);

    const url8 = 'http://example.com/foo?pa/88';
    expect(pageNumFromUrl(url8)).toEqual(88);

    const url9 = 'http://example.com/foo?p/88';
    expect(pageNumFromUrl(url9)).toEqual(88);
  });
});
