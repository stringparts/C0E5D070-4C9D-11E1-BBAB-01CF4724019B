// PatientSearchView class
function PatientSearchView() {
    View.call(this);
}
PatientSearchView.prototype = new View;
PatientSearchView.prototype.constructor = PatientSearchView;

// override
// Initializes the view
PatientSearchView.prototype.initializeView = function (state, query) {
    this.form = $("#searchPatient");
    this.resultsContainerName = "searchResults";
    this.historyStorageKey = "patientSearch";

    this.lastNameField = $("#LastName");
    this.firstNameField = $("#FirstName");
    this.dateOfBirthField = $("#DateOfBirth");
    this.governmentIdField = $("#GovernmentId");
    this.VisitDateField = $("#VisitDate");
    this.VisitLocationField = $("#VisitLocation");

    this.resultsContainer = $("#" + this.resultsContainerName);
    this.searchButton = $("#patientSearch");

    // setup the click handler for the search button
    var view = this;
    this.searchButton.click(function () {
        var searchRequest = new PatientSearchRequest(view.lastNameField.val(), view.firstNameField.val(), view.dateOfBirthField.val(), view.governmentIdField.val());
        view.patientSearch(searchRequest, true);
        return false;
    });

    this.initializeFromState(state, query);
};

// Sets up the page based on the history state and the query string
PatientSearchView.prototype.initializeFromState = function (state, query) {
    var request = null;
    if (state.historyState != null && state.historyState.searchRequest != null) {
        // get the search request from the history
        request = new PatientSearchRequest();
        request.fromStateObject(state.historyState.searchRequest);
    } else if (query != null && (query.ln != null || query.fn != null || query.dob != null || query.gi != null)) {
        // create the search request from the query string
        request = new PatientSearchRequest(query.ln, query.fn, query.dob, query.gi);
    }
    this.setupPatientSearchForm(request);

    if (request != null) {
        var cache = new Cache();
        var response = cache.getItem(this.historyStorageKey + request.toQueryString());
        if (response != null) {
            this.outputPatientSearchResults(request, response, false);
        }
        else {
            this.patientSearch(request, false);
        }
    }
};

PatientSearchView.prototype.setupPatientSearchForm = function (patientSearchRequest) {
    this.form.resetForm();
    this.resultsContainer.html("");

    if (patientSearchRequest != null) {
        this.lastNameField.val(patientSearchRequest.lastName);
        this.firstNameField.val(patientSearchRequest.firstName);
        this.dateOfBirthField.val(patientSearchRequest.dateOfBirth);
        this.governmentIdField.val(patientSearchRequest.governmentId);
    }
};

// perform a search to obtain the results
PatientSearchView.prototype.patientSearch = function (patientSearchRequest, pushState) {
    
    // search for the patients based on the request
    var spinner = getSpinner(this.resultsContainerName);
    new PostRequest().processRequest(
        "/" + Application.getInstance().siteRoot + "/" + "Search",
        patientSearchRequest.serializeForPostback(),
        this.handleSearchResponse,
        { request: patientSearchRequest, pushState: pushState, spinner: spinner },
        this,
        null);
};

// handle the search response
PatientSearchView.prototype.handleSearchResponse = function (rCode, rMs, payload, context) {
    context.spinner.stop();

    if (rCode == "Success") {
        var response = (payload == null || payload == "") ? null : eval("(" + payload + ")");
        this.outputPatientSearchResults(context.request, response, context.pushState);
    }
};

// output the search results and setup the correct history
PatientSearchView.prototype.outputPatientSearchResults = function (request, response, pushState) {
    this.resultsContainer.html("");
    if (response == null || response.length == 0) {
        this.resultsContainer.html("no results found");
    }
    else {
        for (var i = 0; i < response.length; i++) {
            this.resultsContainer.append(this.formatPatientEntry(response[i]));
        }
        var cache = new Cache();
        cache.addItem(this.historyStorageKey + request.toQueryString(), response, true, 5);
    }

    if (pushState) {
        Application.getInstance().siteNavManager.navigateTo({ searchRequest: request }, patientSearchHash, request.toQueryString(), false);
    }
};

// display the patient
PatientSearchView.prototype.formatPatientEntry = function (patient) {
    return "<div><span><a href=\"" + Application.getInstance().siteNavManager.generateUrlFor(patientViewHash, "id=" + patient.PatientId) + "\">" + patient.LastName + "," + patient.FirstName + "</a></span></div>";
};
