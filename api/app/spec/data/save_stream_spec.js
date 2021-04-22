describe('saveStream', function () {
  var factory = require('../../data/save_stream.js');
  
  function saveStream (params) {
    saveStream.params = params;
    saveStream.result = { _id: Math.random() }
    return Promise.resolve(saveStream.result); 
  }
  
  it('Stream succesfully saved', function (done) {
    fn = factory ( {saveStream: saveStream} );
    var payload = { newStream: { name: Math.random() } }; 
    fn(payload).then(function (response) {
      expect(response).toEqual(payload)
      expect(saveStream.params).toEqual(payload.newStream)
      expect(response.stream).toEqual(saveStream.result)
      done();
    });
  });
});