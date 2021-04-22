var connect = require('../../connect.js');
var objectId = require('../../object_id');

describe('findStream', function () {
  var fn = require('../../queries/find_stream')
  , db
  , stream;
  
  beforeEach(function (done) {
    connect.connect()
    .then(function (database) { return db = database; })
    .then(function () {
      stream = {name: 'esteEsTuStream'}
      return db.collection('streams').insertOne(stream)
    })
    .then(done);
  })
  
  it('finds stream', function (done) {
    fn(stream._id).then(function (response) {
      expect(response).toEqual(stream);
      done();
    })
  })
  
  it('it does not find stream', function (done) {
    fn(objectId()).then(function (response){
      expect(response).toBeNull()
      done();
    })
  })
})
