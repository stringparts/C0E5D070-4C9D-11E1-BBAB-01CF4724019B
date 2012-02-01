// SiteNavigationManager class
function SiteNavigationManager(siteTitle, siteRoot, registeredNavigationHandlers, siteContentContainerId) {
    this.siteTitle = siteTitle;
    this.siteRoot = siteRoot;
    this.registeredHandlers = registeredNavigationHandlers;
    this.siteContentContainerId = siteContentContainerId;
    this.maxIndexNumber = 0;
    this.currentIndexNumber = 0;
    this.initialize(this);
}

SiteNavigationManager.prototype.initialize = function (siteNavManager) {
    window.onpopstate = function (event) {
        siteNavManager.handleNav(event);
    }
};

SiteNavigationManager.prototype.handleNav = function (event) {
    var historyContext = {};
    var cache = new Cache();
    if (event.state != null && event.state.index != null) {
        this.currentIndexNumber = event.state.index;
        historyContext = cache.getItem("history" + event.state.index);
    }

    var url = document.location.toString();
    var query = new UrlParser().parseUrl(window.location.hash.substring(window.location.hash.indexOf("?") + 1, window.location.hash.length));

    if (this.registeredHandlers == null || this.registeredHandlers.length < 1) {
        alert('no handler initialized');
    }

    var i = 0;
    for (i = 0; i < this.registeredHandlers.length; ++i) {
        var navHandler = this.registeredHandlers[i];
        if (navHandler.shouldHandleNavigation(url, query)) {
            navHandler.handleNavigation(historyContext, query, this.siteRoot, this.siteContentContainerId);
            return;
        }
    }
    alert('no handlers accepting url');
};

SiteNavigationManager.prototype.navigateTo = function (state, nextHash, queryString, inPlace) {
    if (queryString == null) {
        queryString = "";
    }
    var cache = new Cache();
    var diff = this.maxIndexNumber - this.currentIndexNumber;
    if (diff > 0) {
        for (var r = 1; r < diff; ++r) {
            cache.addItem("history" + (this.currentIndexNumber + r), null, true);
        }
    }
    this.currentIndexNumber++;
    this.maxIndexNumber = this.currentIndexNumber;

    var newUrl = "/" + this.siteRoot + "/" + nextHash + "?" + queryString;
    if (inPlace) {
        history.replaceState({ change: true, type: "replace", index: this.currentIndexNumber }, this.siteTitle, newUrl);
    }
    else {
        history.pushState({ change: true, type: "push", index: this.currentIndexNumber }, this.siteTitle, newUrl);
    }

    cache.addItem("history" + this.currentIndexNumber, new HistoryContext(state, nextHash, queryString), true);
    alert("pushed!");
};

SiteNavigationManager.prototype.generateUrlFor = function (nextHash, queryString) {
    return "/" + this.siteRoot + "/" + nextHash + "?" + queryString;
};

// HistoryContext class
function HistoryContext(historyState, targetHash, targetQueryString) {
    this.historyState = historyState;
    this.sourceUrl = document.location.toString();
    this.targetHash = targetHash;
    this.targetQueryString = targetQueryString;
}