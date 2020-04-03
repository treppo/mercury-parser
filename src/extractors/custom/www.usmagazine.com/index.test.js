import URL from 'url';
import cheerio from 'cheerio';

import Mercury from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContent } from 'utils/text';

const fs = require('fs');

describe('WwwUsmagazineComExtractor', () => {
  it('is selected properly', () => {
    // This test should be passing by default.
    // It sanity checks that the correct parser
    // is being selected for URLs from this domain
    const url =
      'http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419';
    const extractor = getExtractor(url);
    expect(extractor.domain).toEqual(URL.parse(url).hostname);
  });

  it('returns the title', async () => {
    // To pass this test, fill out the title selector
    // in ./src/extractors/custom/www.usmagazine.com/index.js.
    const html = fs.readFileSync(
      './fixtures/www.usmagazine.com/1481147005164.html'
    );
    const articleUrl =
      'http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419';

    const { title } = await Mercury.parse(articleUrl, {
      html,
      fallback: false,
    });

    // Update these values with the expected values from
    // the article.
    expect(title).toEqual(
      'Lady Gaga Shares Photo of Ex Taylor Kinney Hanging With Her Mom and Now We’re Confused'
    );
  });

  it('returns the author', async () => {
    // To pass this test, fill out the author selector
    // in ./src/extractors/custom/www.usmagazine.com/index.js.
    const html = fs.readFileSync(
      './fixtures/www.usmagazine.com/1481147005164.html'
    );
    const articleUrl =
      'http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419';

    const { author } = await Mercury.parse(articleUrl, {
      html,
      fallback: false,
    });

    // Update these values with the expected values from
    // the article.
    expect(author).toEqual('Megan French');
  });

  it('returns the date_published', async () => {
    // To pass this test, fill out the date_published selector
    // in ./src/extractors/custom/www.usmagazine.com/index.js.
    const html = fs.readFileSync(
      './fixtures/www.usmagazine.com/1481147005164.html'
    );
    const articleUrl =
      'http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419';

    const { date_published } = await Mercury.parse(articleUrl, {
      html,
      fallback: false,
    });

    // Update these values with the expected values from
    // the article.
    expect(date_published).toEqual('2016-12-07T20:53:00.000Z');
  });

  it('returns the lead_image_url', async () => {
    // To pass this test, fill out the lead_image_url selector
    // in ./src/extractors/custom/www.usmagazine.com/index.js.
    const html = fs.readFileSync(
      './fixtures/www.usmagazine.com/1481147005164.html'
    );
    const articleUrl =
      'http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419';

    const { lead_image_url } = await Mercury.parse(articleUrl, {
      html,
      fallback: false,
    });

    // Update these values with the expected values from
    // the article.
    expect(lead_image_url).toEqual(
      'http://img.wennermedia.com/social/lady-gaga-taylor-kinney-9662aa39-cb01-4b53-9aa0-7aa8c6e3e94f.jpg'
    );
  });

  it('returns the content', async () => {
    // To pass this test, fill out the content selector
    // in ./src/extractors/custom/www.usmagazine.com/index.js.
    // You may also want to make use of the clean and transform
    // options.
    const html = fs.readFileSync(
      './fixtures/www.usmagazine.com/1481147005164.html'
    );
    const url =
      'http://www.usmagazine.com/celebrity-news/news/lady-gaga-shares-pic-of-ex-taylor-kinney-with-her-mom-w454419';

    const { content } = await Mercury.parse(url, { html, fallback: false });

    const $ = cheerio.load(content || '');

    const first13 = excerptContent($('*').first().text(), 13);

    // Update these values with the expected values from
    // the article.
    expect(first13).toEqual(
      'Taylor Kinney and Lady Gaga arrive at the 37th Annual Kennedy Center Honors'
    );
  });
});
