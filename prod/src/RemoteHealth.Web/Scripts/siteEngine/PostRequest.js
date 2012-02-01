// PostRequest class
function PostRequest() {
}
PostRequest.prototype = new AjaxRequest;
PostRequest.prototype.constructor = PostRequest;

// override
PostRequest.prototype.processRequest = function (url, payload, callback, context, callee, type) {
    var handler = this;
    var requestType = (type == null || type == "") ? 'json' : type;
    $.post(
        url,
        payload,
        function (response) { handler.handleResponse(response, callback, context, callee); },
        requestType);
};