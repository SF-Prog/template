function unwatchEvent(type, callback) {
  window.removeListener(type, callback);
}