import cheerio from 'cheerio';

import isWordpress from './is-wordpress';

describe('isWordpress($)', () => {
  it('returns false if a site is not generated by wordpress', () => {
    const html = `
      <html>
        <head>
          <meta name="generator" value="whatever">
        <head>
      </html>
    `;
    let $ = cheerio.load(html);

    expect(isWordpress($)).toEqual(false);

    const html2 = `
      <html>
        <head>
          <meta name="foo" value="bar">
        <head>
      </html>
    `;
    $ = cheerio.load(html2);

    expect(isWordpress($)).toEqual(false);
  });

  it('returns true if a site is generated by wordpress', () => {
    const html = `
      <html>
        <head>
          <meta name="generator" value="WordPress 4.7-alpha-38592">
        <head>
      </html>
    `;
    const $ = cheerio.load(html);

    expect(isWordpress($)).toEqual(true);
  });
});
