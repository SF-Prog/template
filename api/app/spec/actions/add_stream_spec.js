describe('addStream', function () {
  var factory = require('../../actions/add_stream.js')
  
  function saveStream (params) {
    saveStream.params = params
    saveStream.result = { _id: Math.random() }
    return Promise.resolve(saveStream.result)
  }
  
  it('Adds Stream succesfully', function(done) {
    fn = factory ( { saveStream: saveStream } )
    var payload = { newStream: { name: Math.random() }}
    fn(payload).then(function(response){
      expect(payload.newStream).toEqual(saveStream.params)
      expect(response).toEqual({stream: {_id: saveStream.result._id} })
      done();
    });
  });
  
  it('Stream is missing', function (done) {
    fn = factory ({ saveStream: saveStream })
    var payload = {}
    fn(payload).catch(function (response){
      expect(response).toEqual({'newStream': 'MISSING'})
      done();
    });
  });
  
  it('Stream name not found', function (done) {
    fn = factory ( { saveStream: saveStream} )
    var payload = {newStream: {} }
    fn(payload).catch(function (response) {
      expect(response).toEqual({'newStream.name': 'MISSING'})
      done();
    });
  });
});