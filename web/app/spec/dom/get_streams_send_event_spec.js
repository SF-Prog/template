describe('getStreamsSendEvent', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }

  it('sends event', function (done) {
    var payload = { streams: [ {}, {} ]}
    var fn = getStreamsSendEvent(sendEvent)
    fn(payload).then(function (response) {
      expect(response).toBe(payload)
      expect(sendEvent.params).toEqual({
        type: 'getStreams',
        data: {
          streams: payload.streams
        }
      })
      done();
    });
  });
});