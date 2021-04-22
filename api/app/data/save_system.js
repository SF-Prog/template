module.exports = function saveSystem (strategy) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return strategy.saveSystem(payload.newSystem)
    })
    .then(function (system) {
      payload.system = system
      return payload
    })
  };
}
