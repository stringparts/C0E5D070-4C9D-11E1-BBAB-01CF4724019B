// Application singleton
var Application = (function () {
    var instance = null;

    function CreateApplication(siteTitle, siteRoot, registeredNavigationHandlers, siteContentContainerId) {
        this.siteRoot = siteRoot;

        this.siteNavManager = new SiteNavigationManager(siteTitle, siteRoot, registeredNavigationHandlers, siteContentContainerId);
        //this.cacheSyncQueue = new CacheSyncQueue(siteRoot);
    }

    return new function () {
        this.getInstance = function (siteTitle, siteRoot, registeredNavigationHandlers, siteContentContainerId) {
            if (instance == null) {
                if (siteRoot == null || siteContentContainerId == null) {
                    return false;
                }

                instance = new CreateApplication(siteTitle, siteRoot, registeredNavigationHandlers, siteContentContainerId);
                instance.constructor = null;
            }
            return instance;
        }
    }
})();