module.exports = function findSystem (strategy) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return strategy.findSystem(payload.system._id);
    })
    .then(function (system) {
      if(!system) {
        return Promise.reject({ system: 'NOT FOUND'})
      } else {
        payload.system = system;
        return payload
      }
    });
  };
};
