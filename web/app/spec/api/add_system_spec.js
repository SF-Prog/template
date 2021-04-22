describe('addSystemAPI', function(){
  function makeHttpRequest(params){
    makeHttpRequest.params = params;
    makeHttpRequest.result = { system: Math.random() };
    return Promise.resolve(makeHttpRequest.result);
  }

  it('calls api', function(done) {
    var payload = {name: Math.random()}
    var fn = addSystemAPI(makeHttpRequest)
    fn(payload).then(function(response){
      expect(makeHttpRequest.params).toEqual({
        path: '/add_system',
        body: JSON.stringify({
          newSystem : {
            name : payload.name
          }
        })
      })
      expect(response.system).toEqual(makeHttpRequest.result.system);
      expect(response).toBe(payload);
    })
    done();
  })
});
