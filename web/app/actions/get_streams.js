function getStreamsAction(strategy) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(getStreamsAPI(strategy.makeHttpRequest))
    .then(getStreamsSendEvent(strategy.sendEvent))
  }
}