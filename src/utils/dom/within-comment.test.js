import cheerio from 'cheerio';
import assert from 'assert';

import withinComment from './within-comment';

describe('withinComment(node)', () => {
  it('returns false if its parent is not a comment', () => {
    const $ = cheerio.load(`<div>
                           <div>
                           <div class="author">Adam</div>
                           </div>
                           </div>`);
    expect(withinComment($('.author').first())).toEqual(false);
  });

  it('returns true if its parent has a class of comment', () => {
    const $ = cheerio.load(`<div class="comments">
                           <div>
                           <div class="author">Adam</div>
                           </div>
                           </div>`);
    expect(withinComment($('.author').first())).toEqual(true);
  });

  it('returns true if its parent has an id of comment', () => {
    const $ = cheerio.load(`<div id="comment">
                           <div>
                           <div class="author">Adam</div>
                           </div>
                           </div>`);
    expect(withinComment($('.author').first())).toEqual(true);
  });
});
