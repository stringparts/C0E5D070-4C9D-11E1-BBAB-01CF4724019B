// CacheSyncQueue class
function CacheSyncQueue(siteRoot) {
    this.siteRoot = siteRoot;
    this.cacheSyncItemQueue = new Array();
    this.lastPush = new Date(0);
    this.queuePartition = 5;
    this.processIndex = 0;

    var cacheSyncQueue = this;
    this.intervalTimer = new IntervalTimer(function () { cacheSyncQueue.processQueue(); }, 10000);
    this.intervalTimer.start();
}

CacheSyncQueue.prototype.registerCacheItem = function (cacheKey, cacheType, serverPostUrl) {
    if (cacheKey == null) {
        return false;
    }

    var cache = new Cache(cacheType);
    var cacheItem = cache.getCacheItem(cacheKey);
    if (cacheItem == null) {
        return false;
    }

    var i = 0;
    for (i = 0; i < this.cacheSyncItemQueue.length; ++i) {
        var syncItem = this.cacheSyncItemQueue[i];
        if (syncItem != null && syncItem.cacheKey == cacheKey) {
            return true;
        }
    }
    this.cacheSyncItemQueue.push(new CacheSyncQueueItem(cacheKey, cacheType, serverPostUrl));
    return true;
};

CacheSyncQueue.prototype.processQueue = function () {
    alert("processing");
    this.intervalTimer.stop();

    var i;
    for (i = this.processIndex; (i < this.cacheSyncItemQueue.length && i < (this.processIndex + this.queuePartition)); ++i) {
        this.processIndex++;

        var cacheSyncItem = this.cacheSyncItemQueue[i];

        // check to see if the item has been "removed"
        if (cacheSyncItem == null) {
            continue;
        }

        var cache = new Cache(cacheSyncItem.cacheType);
        var itemToPush = cache.getCacheItem(cacheSyncItem.cacheKey)
        if (itemToPush == null || itemToPush.value == null) {
            // "remove" item
            this.cacheSyncItemQueue[i] = null;
            continue;
        }


        if (itemToPush.timeInMs > this.lastPush) {
            this.pushItem(cacheSyncItem, itemToPush.value);
        }
    }

    if (this.processIndex == this.cacheSyncItemQueue.length) {
        this.lastPush = new Date().getTime();
        this.processIndex = 0;
    }

    this.intervalTimer.start();
};

CacheSyncQueue.prototype.pushItem = function (cacheSyncItem, itemToPush) {
    $.post(
        "/" + Application.getInstance().siteRoot + "/" + cacheSyncItem.serverPostUrl,
        itemToPush,
        function (response) { },
        'json');
};