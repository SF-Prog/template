describe('addSystem', function (){
  function sendEvent(params){
    sendEvent.params = params;
  }

  function makeHttpRequest(params){
    makeHttpRequest.params = params;
    makeHttpRequest.result = { system: Math.random() };
    return Promise.resolve(makeHttpRequest.result);
  }

  it('Calls api and notify events', function(done) {
    var payload = { name : Math.random() }
    var fn = addSystem({
      sendEvent : sendEvent,
      makeHttpRequest : makeHttpRequest
    })
    fn(payload).then(function(response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/add_system',
        body: JSON.stringify({
          newSystem : {
            name : payload.name
          }
        })
      })
      expect(sendEvent.params).toEqual({
        type: 'systemAdded',
        data: {
          system: makeHttpRequest.result.system
        }
      })
      done();
    })
  })
})
