describe('createServer', function () {
  var request = require('./support/request.js')
    , fn = require('../create_server.js')
    , port = 23232
    , server;

  afterEach(function () {
    server.close();
  })

  it('routes request to usecase', function (done) {
    var requestBody = { random: Math.random() };
    server = fn({
      '/testing': function (payload) {
        expect(payload).toEqual(requestBody);
        done();
        return Promise.resolve();
      }
    });
    server.listen(port);
    request({
      port: port,
      path: '/testing',
      body: JSON.stringify(requestBody)
    });
  });

  it('usecase not found', function (done) {
    server = fn({});
    server.listen(port);
    request({
      port: port,
      path: '/anypath',
      body: '{}'
    })
      .then(function (response) {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual('');
        done();
      })
  });
});