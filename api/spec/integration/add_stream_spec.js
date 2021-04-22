describe('addStream', function () {
  var request = require('../../http/spec/support/request.js')
  , connect = require('../../mongo/connect.js');
  
  var port = 27400
  , db
  , server;
  
  beforeAll(function () {
    server = require('../../server.js')();
    server.listen(port);
  });
  
  beforeEach(function (done) {
    connect.connect()
    .then(function (database) { db = database; })
    .then(function () { return db.dropDatabase(); })
    .then(done);
  })
  
  afterAll(function () {
    server.close();
  });
  
  it('cannot add new stream', function (done) {
    request({
      port: port,
      path: '/add_stream',
      body: JSON.stringify({
        itIsNotStream: Math.random()
      })
    })
    .then(function (response) {
      expect(response.statusCode).toBe(400)
      expect(JSON.parse(response.body)).toEqual( { 'newStream': 'MISSING' } )
      done();
    })
  })
  
  it('new Stream added successfully', function (done) {
    var newStream = { name: Math.random() }
    request({
      port: port,
      path: '/add_stream',
      body: JSON.stringify({
        newStream: newStream
      })
    })
    .then(function (response) {
      expect(response.statusCode).toBe(200)
      return db.collection('streams')
      .find().toArray()
      .then(function (streams) {
        expect(streams).toEqual([{ 
          _id: streams[0]._id, 
          name: newStream.name
        }]);
        response.body = JSON.parse(response.body)
        expect(response.body).toEqual({
          stream: { 
            _id: streams[0]._id.toString(),
            name: newStream.name
          }
        })
      })
      .then(done);
    });
  });
});