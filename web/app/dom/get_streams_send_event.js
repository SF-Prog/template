function getStreamsSendEvent(sendEvent) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return sendEvent({
        type: 'getStreams',
        data: {
          streams: payload.streams
        }
      })
    })
    .then(function () {
      return payload
    })
  }
}