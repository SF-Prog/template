function getStreamsAPI(makeHttpRequest) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(function () {
      return makeHttpRequest({
        path: '/get_streams',
        body: JSON.stringify({
          system: { _id: payload.system._id }
        })
      })
    })
    .then(function (response) {
      payload.streams = response.streams;
      return payload
    })
  }
}