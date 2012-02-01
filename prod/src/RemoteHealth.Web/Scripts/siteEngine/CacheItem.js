// CacheItem class
function CacheItem(value, dateIn, timeoutInMins) {
    this.value = value;
    this.timeInMs = dateIn.getTime();
    this.timeoutInMins = timeoutInMins;
}
