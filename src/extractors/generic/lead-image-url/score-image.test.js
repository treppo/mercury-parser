import cheerio from 'cheerio';

import {
  scoreAttr,
  scoreByDimensions,
  scoreByParents,
  scoreByPosition,
  scoreBySibling,
  scoreImageUrl,
} from './score-image';

describe('scoreImageUrlUrl(url)', () => {
  it('gets 20 points for a positive lead img hint', () => {
    const url = 'http://example.com/upload/img.png';

    expect(scoreImageUrl(url)).toEqual(20);
  });

  it('loses 20 points for a negative lead img hint', () => {
    const url = 'http://example.com/sprite/foo/bar.png';

    expect(scoreImageUrl(url)).toEqual(-20);
  });

  it('loses 10 points for a gif', () => {
    const url = 'http://example.com/foo/bar.gif';

    expect(scoreImageUrl(url)).toEqual(-10);

    const url2 = 'http://example.com/foogif/bar';

    expect(scoreImageUrl(url2)).toEqual(0);
  });

  it('gains 10 points for a jpg', () => {
    const url = 'http://example.com/foo/bar.jpg';
    expect(scoreImageUrl(url)).toEqual(10);

    const url2 = 'http://example.com/foo/bar.jpeg';
    expect(scoreImageUrl(url2)).toEqual(10);

    const url3 = 'http://example.com/foojpg/bar';
    expect(scoreImageUrl(url3)).toEqual(0);

    const url4 = 'http://example.com/foo.jpg?bar=baz';
    expect(scoreImageUrl(url4)).toEqual(10);
  });
});

describe('scoreAttr($img)', () => {
  it('gets 5 points if the img node has an alt attribute', () => {
    const $ = cheerio.load('<div><img alt="Wow" /></div>');
    const $img = $('img').first();

    expect(scoreAttr($img)).toEqual(5);
  });

  it('gets 0 points if the img node has an alt attribute', () => {
    const $ = cheerio.load('<div><img /></div>');
    const $img = $('img').first();

    expect(scoreAttr($img)).toEqual(0);
  });
});

describe('scoreByParents($img)', () => {
  it('gets 25 points if it has a figure parent', () => {
    const $ = cheerio.load(
      `<div>
          <figure>
            <div>
              <img alt="Wow" />
            </div>
          </figure>
        </div>`
    );
    const $img = $('img').first();

    expect(scoreByParents($img)).toEqual(25);
  });

  it('gets 0 points if the img has no figure parent', () => {
    const $ = cheerio.load('<div><img /></div>');
    const $img = $('img').first();

    expect(scoreByParents($img)).toEqual(0);
  });

  it('gets 15 points if parent or gparent has photo hints', () => {
    const $ = cheerio.load(
      `<div>
          <div class="figure">
            <div>
              <img alt="Wow" />
            </div>
          </div>
        </div>`
    );
    const $img = $('img').first();

    expect(scoreByParents($img)).toEqual(15);
  });
});

describe('scoreBySibling($img)', () => {
  it('gets 25 points if its sibling is figcaption', () => {
    const $ = cheerio.load(
      `
      <div>
        <img />
        <figcaption>Wow</figcaption>
      </div>
      `
    );
    const $img = $('img').first();

    expect(scoreBySibling($img)).toEqual(25);
  });

  it('gets 15 points if its sibling has photo hints', () => {
    const $ = cheerio.load(
      `<div>
          <div>
              <img alt="Wow" />
              <div class="caption">
                Wow
              </div>
          </div>
        </div>`
    );
    const $img = $('img').first();

    expect(scoreBySibling($img)).toEqual(15);
  });
});

describe('scoreByDimensions($img)', () => {
  it('penalizes skinny images', () => {
    const $ = cheerio.load(
      `
      <div>
        <img width="10" />
      </div>
      `
    );
    const $img = $('img').first();

    expect(scoreByDimensions($img)).toEqual(-50);
  });

  it('penalizes short images', () => {
    const $ = cheerio.load(
      `
      <div>
        <img height="10" />
      </div>
      `
    );
    const $img = $('img').first();

    expect(scoreByDimensions($img)).toEqual(-50);
  });

  it('ignores sprites', () => {
    const $ = cheerio.load(
      `
      <div>
        <img src="/sprite/etc/foo.png" width="1000" height="1000" />
      </div>
      `
    );
    const $img = $('img').first();

    expect(scoreByDimensions($img)).toEqual(0);
  });

  it('penalizes images with small areas', () => {
    const $ = cheerio.load(
      `
      <div>
        <img src="/etc/foo.png" width="60" height="60" />
      </div>
      `
    );
    const $img = $('img').first();

    expect(scoreByDimensions($img)).toEqual(-100);
  });

  it('prefers the largest images', () => {
    const $ = cheerio.load(
      `
      <div>
        <img src="/etc/foo.png" width="1000" height="1000" />
      </div>
      `
    );
    const $img = $('img').first();

    expect(scoreByDimensions($img)).toEqual(1000);
  });
});

describe('scoreByPosition($imgs, index)', () => {
  it('gives higher scores to images that come first', () => {
    const $ = cheerio.load(
      `
      <div>
        <img width="10" />
        <img width="10" />
        <img width="10" />
        <img width="10" />
        <img width="10" />
        <img width="10" />
      </div>
      `
    );
    const $imgs = $('img');

    expect(scoreByPosition($imgs, 0)).toEqual(3);
  });
});
