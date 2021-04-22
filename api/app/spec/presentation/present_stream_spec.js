describe('presentStream', function () {
  var fn = require('../../presentation/present_stream.js')

  it('presents stream', function (done) {
    var payload = {
      stream: Math.random(),
      otroStream: Math.random()
    }

    fn(payload).then(function (result) {
      expect(result).toEqual({stream: payload.stream })
      done();
    });
  });
});
