describe('addStreamAPI', function () {
  function makeHttpRequest (params) {
    makeHttpRequest.params = params;
    makeHttpRequest.result = { stream: Math.random() }; 
    return Promise.resolve(makeHttpRequest.result);
  }
  
  it('calls api to add stream', function (done) {
    var payload = { 
      system: { systemId: Math.random() },
      newStream: { name: Math.random() }
    }
    fn = addStreamAPI (makeHttpRequest)
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/add_stream',
        body: JSON.stringify({
          system: { _id: payload.systemId },
          newStream: { name: payload.name }
        })
      })
      expect(response.stream).toEqual(makeHttpRequest.result.stream)
      expect(response).toEqual(payload)
    })
    done();
  });
});