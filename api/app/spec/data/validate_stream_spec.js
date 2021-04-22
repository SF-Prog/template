describe('validateStream', function () {
  var fn = require('../../data/validate_stream.js')
  
  it('validates Stream', function (done) {
    var payload = { newStream: { name: Math.random() } }
    fn(payload).then(function(response){
      expect(response).toBe(payload)
      done();
    });
  });
  
  it('Stream is missing', function (done) {
    var payload = {}
    fn(payload).catch(function (response) {
      expect(response).toEqual( { newStream: 'MISSING' } )
      done();
    })
  })
  
  it('Stream name missing', function (done) {
    var payload = { newStream: {} }
    fn(payload).catch(function (response) {
      expect(response).toEqual({'newStream.name': 'MISSING'})
      done();
    });
  });
});