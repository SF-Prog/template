describe('validateSystem', function () {

  var fn = require('../../data/validate_system.js');

  it('NewSystem valido', function (done) {
    // informacion que me pasan sea la misma que me devuelven
    // debemos settear la informacion que queremos que valide
    var payload = { newSystem: { name: Math.random() } };
    fn(payload).then(function(response) {
      expect(payload).toBe(response)
      done()
    });
  });

  it('NewSystem vacio', function (done) {
    var payload = {};
    fn(payload).catch(function(response){
      expect(response).toEqual({ newSystem: 'MISSING' })
      done()
    });
  });

  it('NewSystem incompleto, sin nombre', function (done) {
    var payload = { newSystem:{} };
    fn(payload).catch(function(response){
      expect(response).toEqual({ 'newSystem.name': 'MISSING' })
      done()
    });
  });
});
