module.exports = function findSystems (strategy) {
  return function (payload) {
    return Promise.resolve(payload)
      .then(function () {
        return strategy.findSystems(payload);
      })
      .then(function (response) {
        payload.systems = response;
        return payload;
      })
  };
};