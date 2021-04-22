describe('getEvents', function () {
  var factory = require('../../actions/get_events.js');
  
  function findStream (params) {
    findStream.params = params;
    findStream.result = { _id: Math.random() };
    return Promise.resolve(findStream.result)
  };
  
  function findEvents (params) {
    findEvents.params = params;
    findEvents.result = [
      {
        streamId: Math.random(),
        name: Math.random(),
        description: 'el mejor evento ever',
        frecuency: 'de lunes a viernes'
      }
    ]
    return Promise.resolve(findEvents.result);
  };
  
  it('get events', function (done) {
    fn = factory ({
      findStream: findStream,
      findEvents: findEvents
    })
    var stream = { _id: Math.random() };
    var payload = { stream: stream };
    fn(payload).then(function (response) {
      expect(findStream.params).toEqual(stream._id)
      expect(findEvents.params).toEqual(findStream.result._id)
      expect(response).toEqual({
        events: findEvents.result
      })
      done();
    });
  });
});