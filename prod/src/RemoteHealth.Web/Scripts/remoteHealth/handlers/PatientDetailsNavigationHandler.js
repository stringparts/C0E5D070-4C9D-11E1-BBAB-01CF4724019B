// PatientDetailsNavigationHandler class
function PatientDetailsNavigationHandler(navHash) {
    NavigationHandler.call(this, navHash, "PatientDetails", new PatientDetailsView());
}
PatientDetailsNavigationHandler.prototype = new NavigationHandler();
PatientDetailsNavigationHandler.prototype.constructor = PatientDetailsNavigationHandler;

PatientDetailsNavigationHandler.prototype.checkQuery = function (query) {
    return (query.id != null);
};

PatientDetailsNavigationHandler.prototype.renderQueryString = function (query) {
    return "id=" + query.id;
};
