module.exports = function findStreams(strategy) {
  return function (payload) {
    return Promise.resolve(payload)
      .then(function () {
        return strategy.findStreams(payload.system._id)
      })
      .then(function (streams) {
        payload.streams = streams
        return payload
      })
  }
}