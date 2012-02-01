// UrlParser class
function UrlParser() {
    this.params = {};
}

UrlParser.prototype.parseUrl = function (url) {
    if (url == null) {
        return false;
    }

    this.params = {};
    url = url.replace(/^\?/, '');

    var querySplit = url.split("?")
    if (querySplit.length == 1) {
        if (url.indexOf("=") != -1 || url.indexOf("&") != -1) {
            this.parseQueryString(url);
        }
        else if (url.indexOf("#") != -1) {
            this.parseHashString(url);
        }
        else {
            this.params["root"] = url;
        }
    }
    else{
        this.parseHashString(querySplit[0]);    
        this.parseQueryString(querySplit[1]);
    }
    return this.params;
};

UrlParser.prototype.parseHashString = function (urlWithHash) {
    if (urlWithHash == null) {
        return;
    }

    var hashSplit = urlWithHash.split("#");

    if (hashSplit.length > 1) {
        this.params["root"] = hashSplit[0];
        this.params["hash"] = hashSplit[1];
    }
    else {
        if (urlWithHash.indexOf("#") != -1) {
            this.params["hash"] = urlWithHash;
        }
        else {
            this.params["root"] = urlWithHash;
        }
    }
};

UrlParser.prototype.parseQueryString = function (queryString) {
    if (queryString == null) {
        return;
    }

    var parser = this;
    $.each(
        queryString.split("&"),
        function (i, param) {
            var pair = param.split('='), key = parser.decode(pair.shift(), null).toString(), value = parser.decode(pair.length ? pair.join('=') : null, key);
            parser.params[key] = value;
        }
    );
};

UrlParser.prototype.decode = function (string) {
    return decodeURIComponent((string || "").replace('+', ' '));
};