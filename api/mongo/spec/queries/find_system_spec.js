var connect = require('../../connect.js')
  , objectId = require('../../object_id.js');

describe('findSystem', function () {
  var fn = require('../../queries/find_system.js')
    , db
    , system;

    beforeEach(function (done) {
      connect.connect()
        .then(function (_) { db = _; })
        .then(function () { return db.dropDatabase(); })
        .then(function () {
          system = { name: Math.random() }
          return db.collection('systems').insertOne(system)
        })
        .then(done);
    });

    it('finds system', function (done) {
      fn(system._id).then(function (response) {
        expect(response).toEqual(system);
        done();
      })
    })
})
