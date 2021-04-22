describe('sendStreamAddedEvent', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }
  
  it('sends event', function (done) {
    var payload = { stream: Math.random() };
    var fn = sendStreamAddedEvent(sendEvent);
    fn(payload).then(function (response) {
      expect(response).toBe(payload);
      expect(sendEvent.params).toEqual({
        type: 'streamAdded',
        data: {stream: payload.stream }
      })
    })
    done();
  });
});