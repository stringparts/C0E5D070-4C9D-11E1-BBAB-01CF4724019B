// PatientSearchRequest class
function PatientSearchRequest(lastName, firstName, dateOfBirth, governmentId) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.dateOfBirth = dateOfBirth;
    this.governmentId = governmentId;
}
PatientSearchRequest.prototype = new Object();

PatientSearchRequest.prototype.serializeForPostback = function () {
    return { lastName: this.lastName, firstName : this.firstName, dateOfBirth : this.dateOfBirth, governmentId : this.governmentId};
};

PatientSearchRequest.prototype.toQueryString = function () {
    return "ln=" + this.lastName + "&fn=" + this.firstName + "&dob=" + this.dateOfBirth + "&gi=" + this.governmentId;
};