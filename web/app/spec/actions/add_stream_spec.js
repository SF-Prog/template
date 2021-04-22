describe('addStream', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }
  
  function makeHttpRequest(params){
    makeHttpRequest.params = params;
    makeHttpRequest.result = { stream: Math.random() };
    return Promise.resolve(makeHttpRequest.result);
  }
  
  it('Calls API to send stream and notifies event', function (done) {
    var payload = { 
      name: Math.random(),
      systemId: Math.random() // esto se va a tomar de la funcion de fito?
     }
    var fn = addStream({
      makeHttpRequest: makeHttpRequest,
      sendEvent: sendEvent
    })
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/add_stream',
        body: JSON.stringify({
          system: { _id: payload.systemId },
          newStream: { name: payload.name }
        })
      })
      expect(sendEvent.params).toEqual({
        type: 'streamAdded',
        data: { stream: makeHttpRequest.result.stream }
      })
      done();
    });
  });
});