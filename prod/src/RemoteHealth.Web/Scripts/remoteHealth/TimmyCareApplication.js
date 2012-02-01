// TimmyCare pages
var patientSearchHash = "#psearch";
var patientViewHash = "#pview";
var patientEdithHash = "#pedit";
var visitEditHash = "#vedit";

// TimmyCare handlers
var navHandlers = new Array();
navHandlers.push(new IndexNavigationHandler());
navHandlers.push(new SearchNavigationHandler(patientSearchHash));
navHandlers.push(new PatientDetailsNavigationHandler(patientViewHash));

// TimmyCare application
Application.getInstance("Timmy Care", "TimmyCare", navHandlers, "pageContainer", "villageHealthWrapper")
