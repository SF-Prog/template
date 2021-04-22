describe('saveSystem', function () {
  var factory = require('../../data/save_system.js')
  , fn;
  
  function saveSystem (params) {
    saveSystem.params = params;
    saveSystem.result = { _id: Math.random() }
    return Promise.resolve(saveSystem.result);
  }
  
  it('System successfully saved', function (done) {
    fn = factory({ saveSystem: saveSystem });
    var payload = { newSystem: { name: Math.random() }};
    fn(payload).then(function (response) {
      expect(response).toBe(payload)
      expect(saveSystem.params).toEqual(payload.newSystem)
      expect(response.system).toBe(saveSystem.result)
      done()
    });
  });
});
