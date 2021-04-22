describe('findSystems', function () {
  var factory = require('../../data/find_systems.js')
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

  it('Found list of systems', function (done) {
    fn = factory({ findSystems: findSystems });
    payload = { }; 
    fn(payload).then(function (response) {
      expect(response).toEqual(payload)
      expect(findSystems.params).toEqual(payload)
      expect(response.systems).toBe(findSystems.result)
      done()
    })
  });
});
