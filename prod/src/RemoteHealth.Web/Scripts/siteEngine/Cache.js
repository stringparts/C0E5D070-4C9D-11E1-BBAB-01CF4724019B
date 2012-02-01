// Cache class
function Cache(type) {
    this.storageProvider = this.getStorageProvider(type);
}

Cache.prototype.addItem = function (key, value, shouldOverwrite, timeoutInMins) {
    if (key == null) {
        return false;
    }

    if (shouldOverwrite == false && this.getItem(key, value, timeoutInMins) != null) {
        return false;
    }

    var item = new CacheItem(value, new Date(), timeoutInMins);
    var cacheKey = this.generateCacheKey(key);
    this.storageProvider[cacheKey] = JSON.stringify(item);
    return true;
};

// internal
Cache.prototype.getCacheItem = function (key) {
    if (key == null) {
        return false;
    }
    var cacheKey = this.generateCacheKey(key);

    var item = this.storageProvider[cacheKey];
    if (item == null) {
        return null;
    }
    return JSON.parse(item);
};

Cache.prototype.getItem = function (key) {
    item = this.getCacheItem(key);
    if (item == null) {
        return null;
    }

    if (item.timeoutInMins == null) {
        return item.value;
    }

    var diffInMins = Math.floor((new Date().getTime() - item.timeInMs) / 1000 / 60);
    if (diffInMins > item.timeoutInMins) {
        delete this.storageProvider[key];
        return null;
    }

    return item.value;
};

Cache.prototype.getStorageProvider = function (type) {
    if (type == "local") {
        return localStorage;
    }
    else if (type == "session") {
        return sessionStorage;
    }
    return sessionStorage;
};

Cache.prototype.generateCacheKey = function (key) {
    if (key == null) {
        return null;
    }

    // Use an application specific key
    return Application.getInstance().siteRoot + key;
};
