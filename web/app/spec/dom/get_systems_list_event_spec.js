describe('getSystemsListEvent', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }

  it('send getSystemsList event', function (done) {
    var payload = {};
    var fn = getSystemsListEvent(sendEvent);
    fn(payload).then(function (response) {
      expect(response).toBe(payload)
      expect(sendEvent.params).toEqual({
        type: 'systemsObtained',
        data: { systems: response.systems }
      })
      done();
    });
  });
});