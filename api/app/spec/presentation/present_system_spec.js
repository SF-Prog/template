describe('presentSystem', function() {
  var fn = require('../../presentation/present_system.js')

  it('Presents system', function (done) {
    var payload = {
      system: Math.random(),
      otroSystem: Math.random()
    }

    fn(payload).then(function (result) {
      expect(result).toEqual({ system: payload.system })
      done();
    });
  });
});
