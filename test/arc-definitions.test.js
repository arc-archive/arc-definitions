import { fixture, assert } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../arc-definitions.js';

describe('<arc-definitions>', function() {
  async function basicFixture() {
    return (await fixture(`<arc-definitions></arc-definitions>`));
  }

  describe('requestHeaders getter', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns list of request headers', () => {
      const result = element.requestHeaders;
      assert.typeOf(result, 'array', 'returns an array');
      assert.notEmpty(result, 'is not empty array');
      const keys = Object.keys(result[0]);
      assert.deepEqual(keys, ['key', 'desc', 'example', 'autocomplete'], 'is headers struct');
      const index = result.findIndex((item) => item.key === 'Accept');
      assert.notEqual(index, -1, 'List has request header');
    });

    it('calls _setDefinitions()', () => {
      const spy = sinon.spy(element, '_setDefinitions');
      const result = element.requestHeaders;
      assert.typeOf(result, 'array');
      assert.isTrue(spy.called);
    });
  });

  describe('responseHeaders getter', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns list of response headers', () => {
      const result = element.responseHeaders;
      assert.typeOf(result, 'array', 'returns an array');
      assert.notEmpty(result, 'is not empty array');
      const keys = Object.keys(result[0]);
      assert.deepEqual(keys, ['key', 'desc', 'example'], 'is headers struct');
      const index = result.findIndex((item) => item.key === 'Accept-Ranges');
      assert.notEqual(index, -1, 'List has response header');
    });

    it('calls _setDefinitions()', () => {
      const spy = sinon.spy(element, '_setDefinitions');
      const result = element.responseHeaders;
      assert.typeOf(result, 'array');
      assert.isTrue(spy.called);
    });
  });

  describe('statusCodes getter', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Returns list of status codes', () => {
      const result = element.statusCodes;
      assert.typeOf(result, 'array');
      assert.notEmpty(result);
      const keys = Object.keys(result[0]);
      assert.deepEqual(keys, ['key', 'label', 'desc'], 'is headers struct');
    });

    it('calls _setDefinitions()', () => {
      const spy = sinon.spy(element, '_setDefinitions');
      const result = element.statusCodes;
      assert.typeOf(result, 'array');
      assert.isTrue(spy.called);
    });
  });

  describe('Autocomplete', function() {
    let element;
    let requestHeaders;
    before(async () => {
      element = await basicFixture();
      requestHeaders = element.requestHeaders;
    });

    const headers = [
      'Accept', 'Accept-Charset', 'Accept-Encoding', 'Accept-Language',
      'Cache-Control', 'Connection', 'Cookie', 'Content-Type', 'Expect', 'From',
      'Host', 'If-Match', 'If-None-Match', 'If-Range', 'Pragma', 'Range', 'Referer',
      'TE', 'Upgrade', 'User-Agent', 'Via', 'Warning'
    ];

    function findHeader(header) {
      for (let i = 0, len = requestHeaders.length; i < len; i++) {
        if (requestHeaders[i].key === header) {
          return requestHeaders[i];
        }
      }
    }

    headers.forEach(function(header) {
      it(`${header} has autocomplete property`, function() {
        const def = findHeader(header);
        assert.typeOf(def.autocomplete, 'array');
        assert.isAbove(def.autocomplete.length, 0);
      });
    });
  });

  describe('_setDefinitions()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('has no _definitionsReady by default', () => {
      assert.isUndefined(element._definitionsReady);
    });

    it('sets _definitionsReady', () => {
      element._setDefinitions();
      assert.isTrue(element._definitionsReady);
    });

    it('sets _requestHeaders', () => {
      element._setDefinitions();
      assert.typeOf(element._requestHeaders, 'array', 'is an array');
      assert.notEmpty(element._requestHeaders, 'is not empty array');
    });

    it('sets _responseHeaders', () => {
      element._setDefinitions();
      assert.typeOf(element._responseHeaders, 'array', 'is an array');
      assert.notEmpty(element._responseHeaders, 'is not empty array');
    });

    it('sets _statusCodes', () => {
      element._setDefinitions();
      assert.typeOf(element._statusCodes, 'array', 'is an array');
      assert.notEmpty(element._statusCodes, 'is not empty array');
    });
  });

  describe('queryResponseHeaders()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('calls queryHeaders() with passed argument', () => {
      const spy = sinon.spy(element, 'queryHeaders');
      const value = 'accept';
      element.queryResponseHeaders(value);
      assert.equal(spy.args[0][0], value);
    });

    it('calls queryHeaders() with type argument set to response', () => {
      const spy = sinon.spy(element, 'queryHeaders');
      element.queryResponseHeaders('accept');
      assert.equal(spy.args[0][1], 'response');
    });

    it('returns a value', () => {
      const result = element.queryResponseHeaders('accept');
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 1, 'array has 1 items');
    });
  });

  describe('queryRequestHeaders()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('calls queryHeaders() with passed argument', () => {
      const spy = sinon.spy(element, 'queryHeaders');
      const value = 'accept';
      element.queryRequestHeaders(value);
      assert.equal(spy.args[0][0], value);
    });

    it('calls queryHeaders() with type argument set to request', () => {
      const spy = sinon.spy(element, 'queryHeaders');
      element.queryRequestHeaders('accept');
      assert.equal(spy.args[0][1], 'request');
    });

    it('returns a value', () => {
      const result = element.queryRequestHeaders('accept');
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 4, 'array has 4 items');
    });
  });

  describe('queryHeaders()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('returns all request headers', () => {
      const result = element.queryHeaders('', 'request');
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 29, 'array has 29 items');
    });

    it('returns all response headers', () => {
      const result = element.queryHeaders('', 'response');
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 31, 'array has 31 items');
    });

    it('filters the result', () => {
      const result = element.queryHeaders('content', 'request');
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 2, 'array has 2 items');
    });

    it('filters case insensitive', () => {
      const result = element.queryHeaders('ConTent', 'request');
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 2, 'array has 2 items');
    });
  });

  describe('getStatusCode()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('returns all status codes', () => {
      const result = element.getStatusCode();
      assert.typeOf(result, 'array', 'returns an array');
      assert.lengthOf(result, 57, 'array has 57 items');
    });

    it('returns specific statu code', () => {
      const result = element.getStatusCode(201);
      assert.typeOf(result, 'object', 'returns an object');
      assert.equal(result.key, 201, 'item has key property');
    });

    it('accepts numeric string argument', () => {
      const result = element.getStatusCode('201');
      assert.typeOf(result, 'object', 'returns an object');
      assert.equal(result.key, 201, 'item has key property');
    });

    it('returns null for invalid attribute', () => {
      const result = element.getStatusCode('test');
      assert.equal(result, null);
    });

    it('returns null id status not found', () => {
      const result = element.getStatusCode(600);
      assert.equal(result, null);
    });
  });

  describe('_queryHeadersHandler()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    function fire(query, type) {
      if (type === undefined) {
        type = 'request';
      }
      const e = new CustomEvent('query-headers', {
        detail: {
          type,
          query
        },
        bubbles: true,
        cancelable: true
      });
      document.body.dispatchEvent(e);
      return e;
    }

    it('sets headers on the detail object', () => {
      const e = fire('ac');
      assert.typeOf(e.detail.headers, 'array');
      assert.lengthOf(e.detail.headers, 5);
    });

    it('returns empty array when no type', () => {
      const e = fire('ac', null);
      assert.typeOf(e.detail.headers, 'array');
      assert.lengthOf(e.detail.headers, 0);
    });

    it('cancels the event', () => {
      const e = fire('ac', null);
      assert.isTrue(e.defaultPrevented);
    });

    it('calls queryHeaders()', () => {
      const spy = sinon.spy(element, 'queryHeaders');
      fire('ac');
      assert.equal(spy.args[0][0], 'ac');
      assert.equal(spy.args[0][1], 'request');
    });

    it('ignores cancelled eventds', () => {
      const spy = sinon.spy(element, 'queryHeaders');
      document.body.addEventListener('query-headers', function f(e) {
        document.body.removeEventListener('query-headers', f);
        e.preventDefault();
      });
      fire('ac');
      assert.isFalse(spy.called);
    });
  });

  describe('_queryCodesHandler()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    function fire(code) {
      const e = new CustomEvent('query-status-codes', {
        detail: {
          code
        },
        bubbles: true,
        cancelable: true
      });
      document.body.dispatchEvent(e);
      return e;
    }

    it('sets statusCode on the detail object', () => {
      const e = fire(201);
      assert.typeOf(e.detail.statusCode, 'object');
    });

    it('cancels the event', () => {
      const e = fire(200);
      assert.isTrue(e.defaultPrevented);
    });

    it('calls getStatusCode()', () => {
      const spy = sinon.spy(element, 'getStatusCode');
      fire(202);
      assert.equal(spy.args[0][0], 202);
    });

    it('ignores cancelled eventds', () => {
      const spy = sinon.spy(element, 'queryHeaders');
      document.body.addEventListener('query-status-codes', function f(e) {
        document.body.removeEventListener('query-status-codes', f);
        e.preventDefault();
      });
      fire(301);
      assert.isFalse(spy.called);
    });
  });

  describe('a11y', () => {
    it('is accessible', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });

    it('sets aria-hidden attribute', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('aria-hidden'), 'true');
    });

    it('respects existing aria-hidden attribute', async () => {
      const element = await fixture(`<arc-definitions aria-hidden="false"></arc-definitions>`);
      assert.equal(element.getAttribute('aria-hidden'), 'false');
    });
  });
});
