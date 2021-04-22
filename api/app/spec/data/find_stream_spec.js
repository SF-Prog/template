describe('findStream', function () {
  var factory = require('../../data/find_stream.js');
  
  function findStream (params) {
    findStream.params = params;
    findStream.result = { _id: Math.random() };
    return Promise.resolve(findStream.result)
  }
  
  it('it finds the stream', function (done) {
    fn = factory ({ findStream: findStream });
    var stream = { _id: Math.random() };
    var payload = { stream: stream };
    fn(payload).then(function (response) {
      expect(response).toBe(payload);
      expect(findStream.params).toEqual(stream._id)
      expect(response.stream).toEqual(findStream.result)
      done();
    });
  });
  
  it('it does not find the stream', function (done) {
    fn = factory ({ 
      findStream: function () { return Promise.resolve(null) } 
    });
    var payload = { stream: Math.random() };
    fn(payload).catch(function (response) {
      expect(response).toEqual({ 'stream': 'NOT FOUND'})
      done();
    });
  });
});