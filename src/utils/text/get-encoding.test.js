import getEncoding from './get-encoding';

// A shim is used /src/shims/iconv-lite.js to decrease load size

describe('getEncoding(str)', () => {
  it('returns the encoding as a string', () => {
    const contentType = 'text/html; charset=iso-8859-15';
    expect(getEncoding(contentType)).toEqual('iso-8859-15');
  });

  it('returns utf-8 as a default if no encoding found', () => {
    const contentType = 'text/html';
    expect(getEncoding(contentType)).toEqual('utf-8');
  });

  it('returns utf-8 if there is an invalid encoding', () => {
    const contentType = 'text/html; charset=fake-charset';
    expect(getEncoding(contentType)).toEqual('utf-8');
  });
});
