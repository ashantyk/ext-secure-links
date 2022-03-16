# _**EXT Secure Links**_
[![NPM](https://nodei.co/npm/ext-secure-links.png)](https://nodei.co/npm/ext-secure-links/)

[![npm version](https://badge.fury.io/js/ext-secure-links.svg)](https://badge.fury.io/js/ext-secure-links)
[![Build Status](https://travis-ci.com/ashantyk/ext-secure-links.svg?branch=master)](https://travis-ci.org/ashantyk/ext-secure-links)
[![Coverage Status](https://coveralls.io/repos/github/ashantyk/ext-secure-links/badge.svg?branch=master)](https://coveralls.io/github/ashantyk/ext-secure-links?branch=master)

## Features

- Generate nginx secure links
- Validate nginx secure links
 
## Usage

Firstly, install it:

```bash
npm install ext-secure-links --save
```

Use it like this

```js
let path = "/some/url/with/someId/275273592";
let secret = "some_secret_token";
let ttl = 3600; // 1h

const SecureLinks = require('ext-secure-links');

let secureLink = SecureLinks.generate(path, secret, ttl);
console.log(secureLink); // prints '/some/url/with/someId/275273592?h=bff149a0b87f5b0e00d9dd364e9ddaa0&e=1538299376'

let isValid = SecureLinks.validate(path, secret);
console.log(isValid); // prints 'true'
```
