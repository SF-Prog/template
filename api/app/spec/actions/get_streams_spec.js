describe('getStreams', function () {
  var factory = require('../../actions/get_streams.js');

  function findSystem (params){
    findSystem.params = params;
    findSystem.result = { _id: Math.random() };
    return Promise.resolve(findSystem.result)
  };

  function findStreams(params) {
    findStreams.params = params;
    findStreams.result = [
      { 
        systemId: Math.random(),
        name: Math.random() 
      }
    ]
    return Promise.resolve(findStreams.result)
  };

  it('select stream', function (done) {
    fn = factory({
      findSystem: findSystem,
      findStreams: findStreams
    })
    var system = { _id: Math.random() };
    var payload = { system: system }
    fn(payload).then(function (response) {
      expect(findSystem.params).toEqual(system._id)
      expect(findStreams.params).toBe(findSystem.result._id)
      expect(response).toEqual({
        streams: findStreams.result
      })
      done();
    });
  });

  it('does not foud the system', function (done) {
    fn = factory({
      findSystem: function () {
        return Promise.resolve(null)
      },
      findStreams: findStreams 
    })
    var payload = { system: { _id: Math.random() } }
    fn(payload).catch(function (response) {
      expect(response).toEqual({'system': 'NOT FOUND'})
      done();
    });
  });
});
