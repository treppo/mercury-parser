/* eslint-disable global-require, no-undef */
import assert from 'assert';

const urls = [
  {
    url: 'http://www.cnn.com/2016/11/05/middleeast/iraq-mosul-isis-offensive/',
    title: 'Iraqi troops storm town south of Mosul',
  },
  {
    url:
      'https://www.cnn.com/2019/01/30/politics/trump-intel-chiefs-foreign-policy-iran-isis-north-korea/index.html',
    title:
      'Trump chastises intel chiefs after they contradict him on Iran and claims of foreign policy success',
  },
];

// don't run this on CI b/c we want to avoid network requests
if (process.env.CI) {
  // eslint-disable-next-line no-unused-expressions
  typeof Mercury === 'undefined' && require('../dist/mercury');
  describe('Tests', () => {
    it('do not run because this is CI and we do not want network requests', () => {
      expect(true).toEqual(true);
    });
  });
} else {
  const Merc =
    typeof Mercury === 'undefined' ? require('../dist/mercury') : Mercury;

  describe('Is Mercury build working', () => {
    urls.map(article =>
      it(`gets this title right ${article.title}`, done => {
        Merc.parse(article.url)
          .then(result => {
            expect(article.title).toEqual(result.title);
            done();
          })
          .catch(e => {
            console.log(e.name, e.message); // eslint-disable-line no-console
            expect(true).toEqual(false);
            done();
          });
      }, 15000)
    );
  });
}
