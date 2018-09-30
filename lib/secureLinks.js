const Crypto = require('crypto');
const URL = require('url');

let _validate = function(url, secret){

    let parsedUrl = null;

    try {
        parsedUrl = URL.parse(url, true, true);
    } catch (ex){
        return false;
    }

    if(typeof parsedUrl.query !== 'object'){
        return false;
    }

    if(typeof parsedUrl.query.h !== 'string'){
        return false;
    }

    if(typeof parsedUrl.query.e !== 'string'){
        return false;
    }

    let pathname = parsedUrl.pathname;
    let hash     = parsedUrl.query.h;
    let expire   = parseInt(parsedUrl.query.e);

    return _validateRaw(pathname, secret, hash, expire);

};

let _validateRaw = function(pathname, secret, hash, expire){
    
    let now      = Math.round((new Date()).getTime() / 1000);
    
    let md5          =  Crypto.createHash('md5').update(expire + pathname + " " + secret).digest("hex");
    let base64       = new Buffer(md5).toString('base64');
    let computedHash = base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    return computedHash === hash && now < expire;

};

let _generate = function(pathname, secret, ttl){

    let now    = Math.round((new Date()).getTime() / 1000);
    let expire = now + ttl;

    let md5    = Crypto.createHash('md5').update(expire + pathname + " " + secret).digest("hex");
    let base64 = new Buffer(md5).toString('base64');
    let hash   = base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    return pathname + "?h=" + hash + "&e=" + expire;

};

module.exports = {
    'generate': _generate,
    'validate': _validate,
    'validateRaw': _validateRaw
};
