  describe('addSystem', function () {
  var request = require('../../http/spec/support/request.js')
    , connect = require('../../mongo/connect.js');

  var port = 25000
    , db
    , server
    , newSystem;

  beforeAll(function (){
    server = require('../../server.js')();
    server.listen(port);
  });

  beforeEach(function (done) {
    connect.connect()
      .then(function (_) { db = _; })
      .then(function () { return db.dropDatabase(); })
      .then(done);
  });

  afterAll(function (){
    server.close();
  });

  it('cannot add newSystem', function(done) {
    request({
      port: port,
      path: '/add_system',
      body: JSON.stringify({
        newSystemId: Math.random()
      })
    })
    .then(function(response) {
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({newSystem: 'MISSING'})
      done();
    });
  });

  it('newSystem adds sucesfully', function (done) {
    var newSystem = {name : Math.random()}
    request({
      port: port,
      path: '/add_system',
      body: JSON.stringify({
        newSystem : newSystem
      })
    })
    .then(function(response) {
      expect(response.statusCode).toBe(200)
      return db.collection('systems')
        .find().toArray()
        .then(function (systems) {
          expect(systems).toEqual([{
            _id : systems[0]._id,
            name: newSystem.name
          }]);
          response.body = JSON.parse(response.body)
          expect(response.body).toEqual({
            system: {
              _id : systems[0]._id.toString(),
              name: newSystem.name
            }
          })
        })
    })
    .then(done);
  });
});
