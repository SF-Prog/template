describe('getSystems', function () {
  var factory = require('../../actions/get_systems.js')
  , fn;

  function findSystems (params) {
    findSystems.params = params;
    findSystems.result = [
      { _id: Math.random() },
      { _id: Math.random() },
      { _id: Math.random() },
      { _id: Math.random() }
    ];
    return Promise.resolve(findSystems.result); 
  };

  it('Get the list of Systems successfully', function (done) {
    fn = factory({
      findSystems: findSystems
    })
    var payload = { }
    fn(payload).then(function(response){
      expect(findSystems.params).toEqual(payload)
      expect(response).toEqual({ systems: findSystems.result})
      done()
    });
  });
});