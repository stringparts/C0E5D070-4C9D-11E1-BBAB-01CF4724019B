// abstract AjaxRequest class
function AjaxRequest() {
}

// abstract
AjaxRequest.prototype.processRequest = function (url, payload, callback, context, callee, type) {
    return false;
};

// virtual
AjaxRequest.prototype.handleResponse = function (response, callback, context, callee) {
    var rCode = "";
    var rMsg = ""
    var payload = response;

    if (response != null) {
        // get data out of the response
        if (response["responseCode"] != null) {
            rCode = response["responseCode"];
        }

        if (response["responseMessage"] != null) {
            rMsg = response["responseMessage"];
        }

        if (response["payload"] != null) {
            payload = response["payload"];
        }
    }

    if (callee != null) {
        callback.call(callee, rCode, rMsg, payload, context);
    }
    else {
        callback(rCode, rMsg, payload, context);
    }
};