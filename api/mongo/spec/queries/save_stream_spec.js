const connect = require('../../connect.js')

describe('saveStream', function () {
  var fn = require('../../queries/save_stream.js');
  var db;
  
  beforeEach(function (done) {
    connect.connect()
    .then(function (database) { db = database })
    .then(function () { return db.dropDatabase(); })
    .then(done);
  });
  
  it('saves stream', function (done) {
    var payload = { name: Math.random() };
    fn(payload).then(function (result) {
      return db.collection('streams').findOne()
      .then(function (response) {
        expect(response).toEqual( { 
          _id: response._id,
          name: payload.name
        })
        done();
      });
    });
  });
});