// GetRequest class
function GetRequest() {
}
GetRequest.prototype = new AjaxRequest;
GetRequest.prototype.constructor = GetRequest;

GetRequest.prototype.processRequest = function (url, payload, callback, context, callee, type) {
    var handler = this;
    var requestType = (type == null || type == "") ? 'json' : type;
    $.get(
        url,
        function (response) { handler.handleResponse(response, callback, context, callee); },
        requestType);
};