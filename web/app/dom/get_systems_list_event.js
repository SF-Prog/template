function getSystemsListEvent (sendEvent) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return sendEvent({
        type: 'systemsObtained',
        data: { systems: payload.systems }
      })
    })
    .then(function () {
      return payload;
    })
  }
}