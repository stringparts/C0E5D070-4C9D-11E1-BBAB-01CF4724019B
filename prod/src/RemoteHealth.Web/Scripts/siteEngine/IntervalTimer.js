// IntervalTimer class
function IntervalTimer(callback, delay) {
    this.callback = callback;
    this.delay = delay;
    this.intervalId = null;
}

IntervalTimer.prototype.start = function () {
    if (this.intervalId == null) {
        this.intervalId = setInterval(this.callback, this.delay);
    }
    return true;
};

IntervalTimer.prototype.stop = function () {
    if (this.intervalId != null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    return true;
};