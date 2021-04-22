function getSystemsListApi (makeHttpRequest) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return makeHttpRequest ({
        path : '/get_systems',
        body: JSON.stringify({})
      })
    })
    .then(function (result) {
      payload.systems = result.systems;
      return payload;
    })
  }
}
