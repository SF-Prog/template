describe('findSystem', function(){
  var factory = require('../../data/find_system.js');

    function findSystem (params){
      findSystem.params = params;
      findSystem.result = { _id: Math.random() };
      return Promise.resolve(findSystem.result)
    }

    it('it find the system', function (done) {
      fn = factory({ findSystem: findSystem });
      var system = { _id: Math.random() }
      var payload = { system: system };
      fn(payload).then(function (response) {
        expect(response).toBe(payload);
        expect(findSystem.params).toEqual(system._id)
        expect(response.system).toEqual(findSystem.result)
        done();
    });
  });

  it('does not system', function (done) {
    fn = factory({
      findSystem: function () { return Promise.resolve(null) }
    });
    var payload = { system: { _id: Math.random() } }
    fn(payload).catch(function (response) {
      expect(response).toEqual({'system': 'NOT FOUND'})
      done();
    })
  })
});
