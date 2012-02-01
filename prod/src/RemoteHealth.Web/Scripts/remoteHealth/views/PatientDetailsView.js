// PatientDetailsView class
function PatientDetailsView() {
    View.call(this);
}
PatientDetailsView.prototype = new View;
PatientDetailsView.prototype.constructor = PatientDetailsView;

// override
PatientDetailsView.prototype.initializeView = function (state, query) {
    this.patientInfoContainerName = "patientInfo";
    this.patientInfoContainer = $("#" + this.patientInfoContainerName);
    this.visitInfoContainerName = "patientVisits";
    this.visitInfoContainer = $("#" + this.visitInfoContainerName);

    alert(query.id);

    var spinner = getSpinner(this.patientInfoContainerName);
    new GetRequest().processRequest(
        "/" + Application.getInstance().siteRoot + "/" + "GetPatient?patientId=" + query.id,
        null,
        this.handlePatientFetch,
        { id: query.id, spinner: spinner },
        this, 
        null);
};

// handle the patient fetch
PatientDetailsView.prototype.handlePatientFetch = function (rCode, rMs, payload, context) {
    context.spinner.stop();

    if (rCode == "Success") {
        var response = (payload == null || payload == "") ? null : eval("(" + payload + ")");
        this.patientInfoContainer.html(this.formatPatient(response));
    }
};

PatientDetailsView.prototype.formatPatient = function (patient) {
    if (patient != null) {
        return "<span>" + patient.LastName + "," + patient.FirstName + " (" + patient.PatientId + ")" + "</span><br/><span> DOB:" + patient.DateOfBirth + "</span>";
    }
    return null;
};