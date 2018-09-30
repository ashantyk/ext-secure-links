const expect = require('chai').expect;
const secureLinks = require('../index.js');

describe('SecureLinks', () => {

    describe('#generate', () => {

        let positiveTests = [
            {url: "/test", secret: 'test', ttl: 1337},
            {url: "/test/url", secret: 'test', ttl: 1337},
            {url: "//test/url", secret: 'test', ttl: 1337},
            //{url: "test.com/url", secret: 'test', ttl: 1337},
            //{url: "http://test.com/url", secret: 'test', ttl: 1337},
            //{url: "http://test.com/url/sub", secret: 'test', ttl: 1337},
            //{url: "https://test.com/url/sub", secret: 'test', ttl: 1337},
        ];

        positiveTests.forEach(function (test) {
            it('should return valid relative url for: ' + JSON.stringify(test), function () {

                let url = secureLinks.generate(test.url, test.secret, test.ttl);
                let isValidSecureUrl = /^(\/|\/\/)([a-z0-9\s_@\-^!#$%&+={}\[\]\.\/]+)\?h=([a-z0-9]+)\&e=([0-9]+)$/i.test(url); // todo: improve regex pattern
                expect(isValidSecureUrl).to.equal(true, "invalid generated url: " + url);

            });
        });

    });

    describe('#validate', () => {

        let secret = 'test';

        let positiveTests = [
            '/some/url?h=ZDNiYjU2YWIwMjY2YmQ4NjU4MWUyOTY1OWQwZDZiMDM&e=2169442697',
            'http://example.com/some/url?h=ZDNiYjU2YWIwMjY2YmQ4NjU4MWUyOTY1OWQwZDZiMDM&e=2169442697',
        ];

        positiveTests.forEach(function (testUrl) {
            it('should return TRUE for: ' + testUrl, function () {
                let isValid = secureLinks.validate(testUrl, secret);
                expect(isValid).to.equal(true);
            });
        });

        let negativeTests = [
            '/some/url?h=ZDNiYjU2YWIwMjY2YmQ4NjU4MWUyOTY1OWQwZDZiMDM&e=2169442698',
            '/some/url?q=ZDNiYjU2YWIwMjY2YmQ4NjU4MWUyOTY1OWQwZDZiMDM&e=2169442697',
            '/some/url?h=ZDNiYjU2YWIwMjY2YmQ4NjU4MWUyOTY1OWQwZDZiMDM',
            '/some/url2?h=ZDNiYjU2YWIwMjY2YmQ4NjU4MWUyOTY1OWQwZDZiMDM&e=2169442697',
        ];

        negativeTests.forEach(function (testUrl) {
            it('should return FALSE for: ' + testUrl, function () {
                let isValid = secureLinks.validate(testUrl, secret);
                expect(isValid).to.equal(false);
            });
        });

    });

});