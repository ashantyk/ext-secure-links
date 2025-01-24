import { createHash } from 'crypto';
import { parse as parseUrl } from 'url';

export function validate(url, secret){

    let parsedUrl = null;

    try {
        parsedUrl = parseUrl(url, true, true);
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

    return validateRaw(pathname, secret, hash, expire);

}

export function validateRaw(pathname, secret, hash, expire) {
    
    let now      = Math.round((new Date()).getTime() / 1000);
    
    let md5          =  createHash('md5').update(expire + pathname + " " + secret).digest("hex");
    let base64       = new Buffer(md5).toString('base64');
    let computedHash = base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    return computedHash === hash && now < expire;

}

export function generate(pathname, secret, ttl) {

    let now    = Math.round((new Date()).getTime() / 1000);
    let expire = now + ttl;

    let md5    = createHash('md5').update(expire + pathname + " " + secret).digest("hex");
    let base64 = new Buffer(md5).toString('base64');
    let hash   = base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    
    return pathname + "?h=" + hash + "&e=" + expire;

}
