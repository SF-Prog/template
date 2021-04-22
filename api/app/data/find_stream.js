module.exports = function findStream (strategy) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return strategy.findStream(payload.stream._id);
    })
    .then(function (stream) {
      if(!stream) {
        return Promise.reject({ stream: 'NOT FOUND' })
      } else {
        payload.stream = stream;
        return Promise.resolve(payload)
      };
    });
  };
};