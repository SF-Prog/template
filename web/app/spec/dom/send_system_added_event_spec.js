describe('sendSystemAddedEvent', function() {
  function sendEvent(params){
    sendEvent.params = params;
  }
  
  it('send event', function(done) {
    var payload = { system : Math.random() }
    var fn = sendSystemAddedEvent(sendEvent)
    fn(payload).then(function(response){
      expect(response).toBe(payload)
      expect(sendEvent.params).toEqual({
        type: 'systemAdded',
        data: {
          system: payload.system
        }
      })
      done();
    })
  })
})
