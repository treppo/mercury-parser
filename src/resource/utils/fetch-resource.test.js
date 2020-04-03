import assert from 'assert';
import URL from 'url';

import { record } from 'test-helpers';
import fetchResource, { baseDomain, validateResponse } from './fetch-resource';
import { MAX_CONTENT_LENGTH } from './constants';

describe('fetchResource(url)', () => {
  const recorder = record('fetch-resource-test');
  beforeAll(recorder.before);
  afterAll(recorder.after);

  it('returns appropriate json for bad url', async () => {
    const url = 'http://www.nytimes.com/500';
    const { error } = await fetchResource(url);

    expect(error).toEqual(true);
  });

  it('passes custom headers in requests', async () => {
    // A GET request to this endpoint returns the list of all request headers as part of the response JSON
    const url = 'https://postman-echo.com/headers';
    const parsedUrl = URL.parse(url);
    const headers = {
      'my-custom-header': 'Lorem ipsum dolor sit amet',
    };
    const result = await fetchResource(url, parsedUrl, headers);
    const body = JSON.parse(result.body.toString());

    expect(body.headers['my-custom-header']).toEqual(
      'Lorem ipsum dolor sit amet'
    );
  });

  it('returns a buffer as its body', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const result = await fetchResource(url);

    expect(typeof result.body).toEqual('object');
  });

  it('fetches nyt', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const { response } = await fetchResource(url);

    expect(response.statusCode).toEqual(200);
  });

  it('fetches domains', async () => {
    const url = 'http://theconcourse.deadspin.com/1786177057';
    const { response } = await fetchResource(url);

    expect(response.statusCode).toEqual(200);
  });

  it('fetches nyt', async () => {
    const url =
      'http://www.nytimes.com/2016/08/16/upshot/the-state-of-the-clinton-trump-race-is-it-over.html?_r=0';
    const { response } = await fetchResource(url);

    expect(response.statusCode).toEqual(200);
  });

  it('handles this gzip error', async () => {
    const url =
      'http://www.redcross.ca/blog/2016/11/photo-of-the-day--one-year-anniversary-of-the-end-of-ebola-in-sierra-leone';
    const { response } = await fetchResource(url);

    expect(response.statusCode).toEqual(200);
  });
});

describe('validateResponse(response)', () => {
  it('validates a response object', () => {
    const validResponse = {
      statusMessage: 'OK',
      statusCode: 200,
      headers: {
        'content-type': 'text/html',
        'content-length': 500,
      },
    };

    expect(validateResponse(validResponse)).toEqual(true);
  });

  it('throws an error if there is no status code', () => {
    const invalidResponse = {};

    expect(() => {
      validateResponse(invalidResponse);
    }).toThrow();
  });

  it('throws an error if response code is not 200', () => {
    const invalidResponse = {
      statusCode: 500,
    };

    expect(() => {
      validateResponse(invalidResponse);
    }).toThrow();
  });

  it('throws an error if response has bad content-type', () => {
    const invalidResponse = {
      statusMessage: 'OK',
      statusCode: 200,
      headers: {
        'content-type': 'image/gif',
        'content-length': 500,
      },
    };

    expect(() => {
      validateResponse(invalidResponse);
    }).toThrow();
  });

  it('throws an error if response length is > max', () => {
    const invalidResponse = {
      statusMessage: 'OK',
      statusCode: 200,
      headers: {
        'content-type': 'text/html',
        'content-length': MAX_CONTENT_LENGTH + 1,
      },
    };

    expect(() => {
      validateResponse(invalidResponse);
    }).toThrow();
  });
});

describe('baseDomain(parsedUrl)', () => {
  it('returns the base domain, excluding subdomain', () => {
    const url = 'https://www.npmjs.com/package/request#streaming';
    const parsedUrl = URL.parse(url);

    expect(baseDomain(parsedUrl)).toEqual('npmjs.com');
  });

  it('returns the base domain as is if no subdomain', () => {
    const url = 'https://npmjs.com/package/request#streaming';
    const parsedUrl = URL.parse(url);

    expect(baseDomain(parsedUrl)).toEqual('npmjs.com');
  });
});
