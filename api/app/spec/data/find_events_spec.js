describe('findEvents by streamId', function () {
  var factory = require('../../data/find_events.js');
  var streamId = Math.random();
  
  function findEvents (params) {
    findEvents.params = params;
    findEvents.result = [ 
      {
        streamId: streamId,
        name: 'eventoGood',
        description: 'el mejor evento ever',
        frecuency: 'de lunes a viernes'
      },
      {
        streamId: streamId,
        name: 'otroEventoGood',
        description: 'el segundo mejor evento',
        frecuency: 'sabados'
      },
    ]
    return Promise.resolve(findEvents.result)
  }
  
  it('Finds events', function (done) {
    var payload = { stream: { _id: streamId} };
    fn = factory ({ findEvents: findEvents });
    fn(payload).then(function (response) {
      expect(findEvents.params).toEqual(payload.stream._id)
      expect(response.events).toEqual(findEvents.result)
      done();
    });
  });
});