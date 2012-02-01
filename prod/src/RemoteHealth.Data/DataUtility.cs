using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Globalization;

namespace RemoteHealth.Data
{
    public static class DataUtility
    {
        public static string DateFormat = "MM/dd/yyyy";

        public static bool ParseDate(string suppliedDateTime, out DateTime? parsedDateTime)
        {
            parsedDateTime = null;
            if (!String.IsNullOrEmpty(suppliedDateTime))
            {
                DateTime dateTime;
                if (!DateTime.TryParseExact(suppliedDateTime, DataUtility.DateFormat, null, DateTimeStyles.None, out dateTime))
                {
                    return false;
                }
                parsedDateTime = dateTime;
                return true;
            }
            return true;
        }
    }
}
