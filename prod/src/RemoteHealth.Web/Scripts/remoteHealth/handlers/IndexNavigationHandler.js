// IndexNavigationHandler class
function IndexNavigationHandler() {
    SearchNavigationHandler.call("");
}
IndexNavigationHandler.prototype = new SearchNavigationHandler();
IndexNavigationHandler.prototype.constructor = IndexNavigationHandler;

IndexNavigationHandler.prototype.shouldHandleNavigation = function (url, query) {
    return (url.indexOf("#") == -1);
};

IndexNavigationHandler.prototype.handleNavigation = function (state, query, siteRoot, loadContainerId) {
    NavigationHandler.prototype.handleNavigation.call(this, state, query, siteRoot, loadContainerId);
    Application.getInstance().siteNavManager.navigateTo({}, patientSearchHash, "", true);
};