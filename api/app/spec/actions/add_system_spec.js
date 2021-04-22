describe ('addSystem', function(){
  var factory = require('../../actions/add_system.js');

  function saveSystem(params){
    saveSystem.params = params
    saveSystem.result ={ _id : Math.random() }
    return Promise.resolve(saveSystem.result)
  }

  it('addSystem sucesfully', function(done){
    fn = factory({
      saveSystem: saveSystem
    })
    var input = {newSystem : { name : Math.random() }}
    var payload = {newSystem : input.newSystem}
    fn(payload).then(function(response){
      expect(saveSystem.params).toEqual(input.newSystem)
      expect(response).toEqual({system : saveSystem.result})
      done();
    });
  });

  it('no name found', function(done) {
    fn = factory ({
      saveSystem: saveSystem
    })
    var payload = {newSystem : {}}
    fn(payload).catch(function(response) {
      expect(response).toEqual({'newSystem.name': 'MISSING'})
      done();
    });
  });

  it('newSystem not found', function(done) {
    fn = factory ({
      saveSystem: saveSystem
    })
    var payload = {}
    fn(payload).catch(function(response) {
      expect(response).toEqual({ newSystem: 'MISSING' })
      done();
    });
  });
});
