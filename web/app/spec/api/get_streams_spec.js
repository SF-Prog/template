describe('getStreamsAPI', function () {
  function makeHttpRequest(params) {
    makeHttpRequest.params = params;
    makeHttpRequest.result = { streams: Math.random() };
    return Promise.resolve(makeHttpRequest.result);
  }

  it('it call the api', function (done) {
    var payload = { system: { _id: Math.random() } }
    var fn = getStreamsAPI(makeHttpRequest)
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/get_streams',
        body: JSON.stringify({
          system: { _id: payload.system._id }
        })
      })
      expect(response.streams).toEqual(makeHttpRequest.result.streams);
      expect(response).toBe(payload)
      done();
    })
  })
})