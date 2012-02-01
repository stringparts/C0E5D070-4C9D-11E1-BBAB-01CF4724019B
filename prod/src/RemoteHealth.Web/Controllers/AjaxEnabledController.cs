using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace RemoteHealth.Web.Controllers
{
    public abstract class AjaxEnabledController : Controller
    {
        public enum ResponseCode
        {
            Success = 0,
            KnownError = 1,
            UnknownError = 2
        }

        protected JsonResult SerializeJsonResponse<T>(ResponseCode responseCode, T payload, string responseDetails)
        {
            var serializer = new JavaScriptSerializer();
            var serializedPayload = (payload != null) ? serializer.Serialize((T)payload) : String.Empty;
            return Json(new { responseCode = responseCode.ToString(), responseMessage = responseDetails ?? String.Empty, payload = serializedPayload }, JsonRequestBehavior.AllowGet);
        }
    }
}
