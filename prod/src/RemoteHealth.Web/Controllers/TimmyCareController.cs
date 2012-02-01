using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using RemoteHealth.Data;
using System.Globalization;

namespace RemoteHealth.Web.Controllers
{
    public class TimmyCareController : AjaxEnabledController
    {
        // Bootload page
        public ActionResult Index()
        {
            return View();
        }

        #region search
        // Returns search page
        public ActionResult Search()
        {
            return View();
        }


        // Returns search results for patient or visit
        [HttpPost]
        public JsonResult Search(string lastName, string firstName, string dateOfBirth, string governmentId, string dateOfVisit, string visitLocation)
        {
            if (string.IsNullOrEmpty(lastName) && string.IsNullOrEmpty(firstName) && string.IsNullOrEmpty(dateOfBirth) && string.IsNullOrEmpty(governmentId) && string.IsNullOrEmpty(dateOfVisit) && string.IsNullOrEmpty(visitLocation))
            {
                return this.SerializeJsonResponse<List<Patient>>(ResponseCode.KnownError, null, "Invalid search parameters");
            }

            DateTime? dob = null;
            if (!DataUtility.ParseDate(dateOfBirth, out dob))
            {
                return this.SerializeJsonResponse<List<Patient>>(ResponseCode.KnownError, null, "Invalid date of birth");
            }

            DateTime? visitDate = null;
            if (!DataUtility.ParseDate(dateOfVisit, out visitDate))
            {
                return this.SerializeJsonResponse<List<Patient>>(ResponseCode.KnownError, null, "Invalid visit date");
            }

            try
            {
                using (var dataProvider = new RemoteHealthDataProvider())
                {
                    List<Patient> foundPatients = FindPatients(dataProvider, lastName, firstName, dob);
                    if (foundPatients != null && foundPatients.Count > 0)
                    {
                        return this.SerializeJsonResponse<List<Patient>>(ResponseCode.Success, foundPatients, null);
                    }
                    else
                    {
                        return this.SerializeJsonResponse<List<Patient>>(ResponseCode.Success, null, "No results found");
                    }
                }
            }
            catch
            {
                //TODO(muz): log
                return this.SerializeJsonResponse<List<Patient>>(ResponseCode.UnknownError, null, null);
            }
        }

        private static List<Patient> FindPatients(RemoteHealthDataProvider dataProvider, string lastName, string firstName, DateTime? dob)
        {
            var patients = from p in dataProvider.Patients select p;
            if (!string.IsNullOrEmpty(lastName))
            {
                patients = patients.Where(p => p.LastName.Equals(lastName, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(firstName))
            {
                patients = patients.Where(p => p.FirstName.Equals(firstName, StringComparison.OrdinalIgnoreCase));
            }

            if (dob.HasValue)
            {
                patients = patients.Where(p => p.DateOfBirth >= dob.Value);
            }

            /*
            if (!string.IsNullOrEmpty(governmentId))
            {
                patients = patients.Where(p => p.GovernmentId.Equals(governmentId, StringComparison.OrdinalIgnoreCase));
            }
                * */

            return patients.ToList();
        }
        #endregion

        #region patient details
        // Returns search page
        public ActionResult PatientDetails(string id)
        {
            //TODO(muz): optimize by removing this and put the html in the javascript
            return View();
        }

        public JsonResult GetPatient(Guid patientId)
        {
            if (patientId == Guid.Empty)
            {
                return this.SerializeJsonResponse<Patient>(ResponseCode.KnownError, null, "Invalid patient id");
            }

            try
            {
                using (var dataProvider = new RemoteHealthDataProvider())
                {
                    var patientQuery = from p in dataProvider.Patients where p.PatientId == patientId select p ;
                    var foundPatient = patientQuery.FirstOrDefault();
                    if (foundPatient != null)
                    {
                        return this.SerializeJsonResponse<Patient>(ResponseCode.Success, foundPatient, null);
                    }
                    else
                    {
                        return this.SerializeJsonResponse<List<Patient>>(ResponseCode.Success, null, "Patient not found");
                    }
                }
            }
            catch
            {
                //TODO(muz): log
                return this.SerializeJsonResponse<List<Patient>>(ResponseCode.UnknownError, null, null);
            }
        }
        #endregion
    }
}
