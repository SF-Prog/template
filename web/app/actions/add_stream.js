function addStream (strategy) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(addStreamAPI(strategy.makeHttpRequest))
    .then(sendStreamAddedEvent(strategy.sendEvent))
  };
};