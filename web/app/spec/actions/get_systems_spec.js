describe('getSystems', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }

  function makeHttpRequest (params) {
    makeHttpRequest.params = params;
    makeHttpRequest.result = {
      systems: [
        { name: Math.random(), _id: Math.random() },
        { name: Math.random(), _id: Math.random() },
        { name: Math.random(), _id: Math.random() },
        { name: Math.random(), _id: Math.random() }
      ]
    };
    return Promise.resolve(makeHttpRequest.result);
  }

  it('Calls getSystemsAPI and sends getSystemEvent', function (done) {
    var payload = {};
    var fn = getSystems({
      sendEvent : sendEvent,
      makeHttpRequest : makeHttpRequest
    });
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/get_systems',
        body: JSON.stringify({})
      })
      expect(sendEvent.params).toEqual({
        type: 'systemsObtained',
        data: { systems: makeHttpRequest.result.systems }
      })
    })
    done();
  });
});