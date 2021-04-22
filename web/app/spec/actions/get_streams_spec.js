describe('getStreamsAction', function () {
  
  function sendEvent (params) {
    sendEvent.params = params;
  }

  function makeHttpRequest (params) {
    makeHttpRequest.params = params;
    makeHttpRequest.result = { streams: Math.random() };
    return Promise.resolve(makeHttpRequest.result)
  }

  it('calls api and notify', function (done) {
    var payload = { system: { _id: Math.random() } }
    fn = getStreamsAction({
      sendEvent: sendEvent,
      makeHttpRequest: makeHttpRequest
    })
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/get_streams',
        body: JSON.stringify({
          system: { _id: payload.system._id } 
        })
      })
      expect(sendEvent.params).toEqual({
        type: 'getStreams',
        data: { streams: makeHttpRequest.result.streams }
      })
      done();
    });
  });
});