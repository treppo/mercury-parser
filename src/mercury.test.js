import { record } from 'test-helpers';
import Mercury from './mercury';

const fs = require('fs');

describe('Mercury', () => {
  const recorder = record('mercury-test');
  beforeAll(recorder.before);
  afterAll(recorder.after);

  describe('parse(url)', () => {
    it('returns an error if a malformed url is passed', async () => {
      const error = await Mercury.parse('foo.com');

      expect(
        /does not look like a valid URL/i.test(error.message)
      ).toBeTruthy();
    });

    it('does the whole thing', async () => {
      const result = await Mercury.parse(
        'http://deadspin.com/remember-when-donald-trump-got-booed-for-butchering-ta-1788216229'
      );

      expect(typeof result).toEqual('object');
      expect(result.content.indexOf('score="') === -1).toEqual(true);
    });

    it('returns an error on non-200 responses', async () => {
      const error = await Mercury.parse(
        'https://www.thekitchn.com/instant-pot-chicken-pesto-pasta-eating-instantly-267141'
      );

      expect(/instructed to reject non-200/i.test(error.message)).toBeTruthy();
    });

    it('returns an error on invalid content types', async () => {
      const error = await Mercury.parse(
        'https://upload.wikimedia.org/wikipedia/commons/5/52/Spacer.gif'
      );

      expect(
        /content-type for this resource/i.test(error.message)
      ).toBeTruthy();
    });

    it('does wikipedia', async () => {
      const result = await Mercury.parse(
        'https://en.wikipedia.org/wiki/Brihadeeswarar_Temple_fire'
      );

      expect(typeof result).toEqual('object');
    });

    it('does washingtonpost', async () => {
      const result = await Mercury.parse(
        'https://www.washingtonpost.com/news/opinions/wp/2018/10/29/enough-platitudes-lets-name-names/'
      );

      expect(typeof result).toEqual('object');
      expect(result.total_pages).toEqual(1);
      expect(result.url).toEqual(
        'https://www.washingtonpost.com/news/opinions/wp/2018/10/29/enough-platitudes-lets-name-names/'
      );
    });

    it('does the nyt', async () => {
      const result = await Mercury.parse(
        'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0'
      );

      expect(typeof result).toEqual('object');
      expect(result.total_pages).toEqual(1);
    });

    it('does ars pagination', async () => {
      const url =
        'https://arstechnica.com/gadgets/2016/08/the-connected-renter-how-to-make-your-apartment-smarter/';
      const result = await Mercury.parse(url, { fetchAllPages: true });

      const { total_pages, pages_rendered } = result;

      expect(total_pages).toEqual(3);
      expect(pages_rendered).toEqual(3);

      expect(result.next_page_url).toEqual(`${url}2`);
    });
  });

  it('returns text content if text is passed as contentType', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { content } = await Mercury.parse(url, { html, contentType: 'text' });

    const htmlRe = /<[a-z][\s\S]*>/g;

    expect(htmlRe.test(content)).toEqual(false);
  });

  it('returns markdown if markdown is passed as contentType', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { content } = await Mercury.parse(url, {
      html,
      contentType: 'markdown',
    });

    const htmlRe = /<[a-z][\s\S]*>/;
    const markdownRe = /\[[\w\s]+\]\(.*\)/;

    expect(htmlRe.test(content)).toEqual(false);
    expect(markdownRe.test(content)).toEqual(true);
  });

  it('returns custom elements if an extend object is passed', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { sites } = await Mercury.parse(url, {
      html,
      extend: {
        sites: {
          selectors: ['a.site-name'],
          allowMultiple: true,
        },
      },
    });
    expect(sites).toBeTruthy();
    expect(sites.length).toEqual(8);
    expect(sites[0]).toEqual('NYMag.com');
  });

  it('returns an array if a single element matches a custom extend', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { sites } = await Mercury.parse(url, {
      html,
      extend: {
        sites: {
          selectors: [['li:first-child a.site-name', 'href']],
          allowMultiple: true,
        },
      },
    });
    expect(sites).toBeTruthy();
    expect(sites.length).toEqual(1);
  });

  it('returns custom attributes if an extend object is passed', async () => {
    const url =
      'http://nymag.com/daily/intelligencer/2016/09/trump-discussed-usd25k-donation-with-florida-ag-not-fraud.html';
    const html = fs.readFileSync(
      './src/extractors/custom/nymag.com/fixtures/test.html',
      'utf8'
    );
    const { sites } = await Mercury.parse(url, {
      html,
      extend: {
        sites: {
          selectors: [['a.site-name', 'href']],
          allowMultiple: true,
        },
      },
    });
    expect(sites).toBeTruthy();
    expect(sites.length).toEqual(8);
    expect(sites[1]).toEqual('http://nymag.com/daily/intelligencer/');
  });

  it('is able to use custom extractors (with extension) added via api', async () => {
    const url =
      'https://www.sandiegouniontribune.com/business/growth-development/story/2019-08-27/sdsu-mission-valley-stadium-management-firm';
    const html = fs.readFileSync(
      './fixtures/sandiegouniontribune.com/test.html',
      'utf8'
    );

    const customExtractor = {
      domain: 'www.sandiegouniontribune.com',
      title: {
        selectors: ['h1', '.ArticlePage-headline'],
      },
      author: {
        selectors: ['.ArticlePage-authorInfo-bio-name'],
      },
      content: {
        selectors: ['article'],
      },
      extend: {
        testContent: {
          selectors: ['.ArticlePage-breadcrumbs a'],
        },
      },
    };

    Mercury.addExtractor(customExtractor);

    const result = await Mercury.parse(url, { html });
    expect(typeof result).toEqual('object');
    expect(result.author).toEqual('Jennifer Van Grove');
    expect(result.domain).toEqual('www.sandiegouniontribune.com');
    expect(result.total_pages).toEqual(1);
    expect(result.testContent).toEqual('Growth & Development');
  });
});
