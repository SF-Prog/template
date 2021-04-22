var connect = require('../../connect.js')
  , objectId = require('../../object_id.js');

describe('findStreams', function () {
  var fn = require('../../queries/find_streams.js')
    , db
    , systemId
    , streams;

  beforeEach(function (done) {
    connect.connect()
      .then(function (_) { db = _; })
      .then(function () { return db.dropDatabase(); })
      .then(function () {
        systemId = objectId();
        streams = [
          {
            systemId: systemId,
            name: Math.random()
          },
          {
            systemId: systemId,
            name: Math.random()
          },
          {
            systemId: objectId(),
            name: Math.random()
          }
        ]
        return db.collection('streams').insertMany(streams)
      })
      .then(done)
  })

  it('gets streams by system id', function (done) {
    fn(systemId).then(function (response) {
      expect(response).toEqual([ streams[0], streams[1] ])
      done();
    });
  });

  it('does not find streams', function (done) {
    var input = { _id: objectId() }
    fn(input._id).then(function (response) {
      expect(response).toEqual([])
      done();
    });
  });
});