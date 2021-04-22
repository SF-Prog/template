function sendStreamAddedEvent (sendEvent) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return sendEvent ({
        type: 'streamAdded',
        data: { stream: payload.stream}
      })
    })
    .then(function () {
      return payload;
    })
  };
};