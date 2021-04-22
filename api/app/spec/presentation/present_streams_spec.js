describe('presents streams', function () {
  var fn = require('../../presentation/present_streams.js')

  it('presents streams', function (done) {
    var payload = {
      otraCosa: Math.random(),
      streams:  [
        {
          _id: Math.random(),
          name: Math.random()
        },
        {
          _id: Math.random(),
          name: Math.random()
        }
      ]
    }
    fn(payload).then(function (response) {
      expect(response).toEqual({ streams: payload.streams })
      done();
    });
  });
});