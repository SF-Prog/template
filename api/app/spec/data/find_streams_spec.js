describe('findStreams', function () {
  var factory = require('../../data/find_streams.js')
    , systemId;

  var systemId = Math.random();

  function findStreams(params) {
    findStreams.params = params;
    findStreams.result = [
      { 
        systemId: systemId,
        name: Math.random() 
      },
      { 
        systemId: systemId,
        name: Math.random()
      }
    ]
    return Promise.resolve(findStreams.result)
  }

  it('finds streams', function (done) {
    fn = factory({ findStreams: findStreams })
    var payload = { system: { _id: systemId } };
    fn(payload).then(function (response) {
      expect(findStreams.params).toEqual(payload.system._id)
      expect(response.streams).toBe(findStreams.result)
      done();
    });
  });
});