module.exports = function saveStream (strategy) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return strategy.saveStream(payload.newStream)
    })
    .then(function (stream) {
      payload.stream = stream;
      return payload;
    });
  };
};