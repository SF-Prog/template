describe('getStreams', function () {
  var request = require('../../http/spec/support/request.js')
    , connect = require('../../mongo/connect.js')
    , objectId = require('../../mongo/object_id.js');

  var port = 25000
    , db
    , server
    , system
    , streams;

  beforeAll(function () {
    server = require('../../server.js')();
    server.listen(port);
  });

  beforeEach(function (done) {
    connect.connect()
      .then(function (_) { db = _; })
      .then(function () { return db.dropDatabase(); })
      .then(function () {
        system = {
          name: Math.random()
        }
        return db.collection('systems').insertOne(system)
      })
      .then(function () {
        streams = [
          {
            systemId: system._id,
            name: Math.random()
          },
          {
            systemId: system._id,
            name: Math.random()
          },
          {
            systemId: Math.random(),
            name: Math.random()
          }
        ]
        return db.collection('streams').insertMany(streams)
      })
      .then(done);
  });

  afterAll(function () {
    server.close();
  });

  it('finds streams', function (done) {
    request({
      port: port,
      path: '/get_streams',
      body: JSON.stringify({
        system: { _id: system._id }
      })
    })
    .then(function (response) {
      expect(response.statusCode).toBe(200)
      response.body = JSON.parse(response.body)
      expect(response.body).toEqual({
        streams: [
          {
            systemId: system._id.toString(),
            _id: streams[0]._id.toString(),
            name: streams[0].name
          },
          {
            systemId: system._id.toString(),
            _id: streams[1]._id.toString(),
            name: streams[1].name
          }
        ]
      })
    })
    .then(done);
  })

  it('cannot select streams', function (done) {
    request({
      port: port,
      path: '/get_streams',
      body: JSON.stringify({
        system: { _id: objectId() }
      })
    })
    .then(function (response) {
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual({ system: 'NOT FOUND' })
      done();
    })
  })
})
