function sendEvent(options) {
  var event = new Event(options.type);
  event.data = options.data;
  window.dispatchEvent(event);
}