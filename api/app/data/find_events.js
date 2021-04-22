module.exports = function findEvents (strategy) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(function () {
      return strategy.findEvents(payload.stream._id)
    })
    .then(function (events) {
      payload.events = events;
      return payload;
    });
  };
};