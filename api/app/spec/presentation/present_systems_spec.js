describe('presentSystems', function () {
  var fn = require('../../presentation/present_systems.js')

  it('Presents multiple systems', function (done) {
    var payload = {
      systems: [
          { name: Math.random() },
          { name: Math.random() },
          { name: Math.random() },
          { name: Math.random() } 
      ],
      filterNode: Math.random()
    }
    fn(payload).then(function (result) {
      expect(result).toEqual({
        systems: [
          payload.systems[0],
          payload.systems[1],
          payload.systems[2], 
          payload.systems[3]
        ]
      });
      done();
    });
  });
});