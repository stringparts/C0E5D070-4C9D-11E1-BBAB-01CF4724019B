// SearchNavigationHandler class
function SearchNavigationHandler(navHash) {
    NavigationHandler.call(this, navHash, "Search", new PatientSearchView());
}
SearchNavigationHandler.prototype = new NavigationHandler();
SearchNavigationHandler.prototype.constructor = SearchNavigationHandler;