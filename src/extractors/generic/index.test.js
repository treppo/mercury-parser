import assert from 'assert';
import moment from 'moment';

import GenericExtractor from './index';

const fs = require('fs');

describe('GenericExtractor', () => {
  describe('extract(opts)', () => {
    it('extracts this old LA Times article', () => {
      const html = fs.readFileSync('./fixtures/latimes.html', 'utf-8');

      const { title, author, date_published, dek } = GenericExtractor.extract({
        url: 'http://latimes.com',
        html,
        metaCache: [],
      });
      const newDatePublished = moment(date_published).format();

      expect(author).toEqual(null);
      expect(title).toEqual(
        'California appears poised to be first to ban power-guzzling big-screen TVs'
      );
      expect(newDatePublished.split('T')[0]).toEqual('2009-10-14');
      expect(dek).toEqual(null);
    });

    it('extracts html and returns the article title', () => {
      const html = fs.readFileSync('./fixtures/wired.html', 'utf-8');

      const { author, title, datePublished, dek } = GenericExtractor.extract({
        url: 'http://wired.com',
        html,
        metaCache: [],
      });

      expect(author).toEqual('Eric Adams');
      expect(title).toEqual(
        'Airplane Tires Don’t Explode on Landing Because They Are Pumped!'
      );
      expect(datePublished).toBeUndefined();
      expect(dek).toEqual(null);
    });
  });
});
