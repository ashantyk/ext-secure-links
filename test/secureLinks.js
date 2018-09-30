const expect = require('chai').expect;
const secureLinks = require('../index.js');

describe('SecureLinks', () => {

    describe('#generate', () => {

        let positiveTests = [
            {url: "/test", secret: 'test', ttl: 1337},
            {url: "/test/url", secret: 'test', ttl: 1337},
            {url: "//test/url", secret: 'test', ttl: 1337},
            {url: "test.com/url", secret: 'test', ttl: 1337},
            {url: "http://test.com/url", secret: 'test', ttl: 1337},
            {url: "http://test.com/url/sub", secret: 'test', ttl: 1337},
            {url: "https://test.com/url/sub", secret: 'test', ttl: 1337},
        ];

        positiveTests.forEach(function (test) {
            it('should return valid relative url for: ' + JSON.stringify(test), function () {

                let url = secureLinks.generate(test.url, test.secret, test.ttl);
                let isValidSecureUrl = /^(\/|\/\/)([a-z0-9\s_@\-^!#$%&+={}\[\]\.\/]+)\?h=([a-z0-9]+)\&e=([0-9]+)$/i.test(url); // todo: improve regex pattern
                expect(isValidSecureUrl).to.equal(true, isValidSecureUrl, "invalid generated url: " + url);

            });
        });

    });

});