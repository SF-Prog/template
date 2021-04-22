function addStreamAPI (makeHttpRequest) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return makeHttpRequest({
        path: '/add_stream',
        body: JSON.stringify({
          system: { _id: payload.systemId },
          newStream: { name: payload.name }
        })
      })
    })
    .then(function (result) {
      payload.stream = result.stream;
      return payload;
    });
  };
};