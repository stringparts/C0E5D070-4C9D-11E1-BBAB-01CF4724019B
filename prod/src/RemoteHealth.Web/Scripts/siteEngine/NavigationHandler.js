// NavigationHandler class
function NavigationHandler(hash, renderPath, view) {
    this.hash = hash;
    this.renderPath = renderPath;
    this.view = view;
}

NavigationHandler.prototype.shouldHandleNavigation = function (url, query) {
    return (url.indexOf(this.hash) != -1) && this.checkQuery(query);
};

NavigationHandler.prototype.handleNavigation = function (state, query, siteRoot, loadContainerId) {
    var spinner = getSpinner(loadContainerId);
    var handler = this;
    var container = $("#" + loadContainerId);

    // allow the view to handle requests on its own
    if (this.renderPath == null || this.renderPath == "") {
        handler.handleRender(null, container, spinner, state, query);
        return;
    }

    // get from cache if possible, otherwise, go to the server
    var cacheItem = this.getResponseFromCache(siteRoot, this.renderPath, this.renderQueryString(query));
    if (cacheItem == null) {
        var fetchPath = "/" + siteRoot + "/" + this.renderPath + "?" + this.renderQueryString(query);
        new GetRequest().processRequest(
            fetchPath,
            null,
            this.handleFetchResponse,
            { container: container, state: state, query: query, siteRoot: siteRoot, spinner: spinner },
            this,
            'html');
    }
    else {
        handler.handleRender(cacheItem, container, spinner, state, query);
    }
};

// handle the fetch response
NavigationHandler.prototype.handleFetchResponse = function (rCode, rMs, payload, context) {

    this.handleRender(payload, context.container, context.spinner, context.state, context.query);
    this.addResponseToCache(context.siteRoot, this.renderPath, this.renderQueryString(context.query), payload);
};

NavigationHandler.prototype.createCachePath = function (siteRoot, renderPath, queryString) {
    return "/" + siteRoot + "/" + renderPath;
};

NavigationHandler.prototype.getResponseFromCache = function (siteRoot, renderPath, queryString) {
    var cachePath = this.createCachePath(siteRoot, renderPath);

    var cache = new Cache("local");
    return cache.getItem(cachePath);
};

// virtual
NavigationHandler.prototype.addResponseToCache = function (siteRoot, renderPath, queryString, response) {
    var cachePath = this.createCachePath(siteRoot, renderPath);

    var cache = new Cache("local");
    cache.addItem(cachePath, response, true);
};

// virtual
NavigationHandler.prototype.handleRender = function (response, container, spinner, state, query) {
    container.html(response);
    spinner.stop();

    this.view.initializeView(state, query);
};

// virtual
NavigationHandler.prototype.checkQuery = function (query) {
    return true;
};

// virtual 
NavigationHandler.prototype.renderQueryString = function (query) {
    return "";
};
