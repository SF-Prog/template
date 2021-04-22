module.exports = function saveEventType (strategy) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return strategy.saveEventType({
        newEventType : payload.newEventType,
        stream : payload.stream
      })
    })
    .then(function (eventType) {
      payload.eventType = eventType
      return payload
    })
  }
}
