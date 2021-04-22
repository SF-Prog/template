describe('getSystems', function () {
  var request = require('../../http/spec/support/request.js')
  , connect = require('../../mongo/connect.js');
  
  var port = 25000
    , db
    , server;
  
  beforeAll(function () {
    server = require('../../server.js')();
    server.listen(port);
  });

  beforeEach(function (done) {
    connect.connect()
      .then(function (_) { db = _;})
      .then(function () {
         db.dropDatabase(); 
         var systemsDB = [
          { name: Math.random() },
          { name: Math.random() },
          { name: Math.random() },
          { name: Math.random() }
        ];
        return db.collection('systems').insertMany(systemsDB);
      })
      .then(done)
  });

  afterAll(function () {
      server.close();
  });

  it('Successfully getStystems', function (done) {
    request({
      port: port,
      path: '/get_systems',
      body: JSON.stringify({})
    })
    .then(function (response) {
      expect(response.statusCode).toBe(200)
      return db.collection('systems')
        .find().toArray()
        .then(function (systems) {
          expect(systems).toEqual([
            {
              _id: systems[0]._id,
              name: systems[0].name,
            },
            {
              _id: systems[1]._id,
              name: systems[1].name,
            },
            {
              _id: systems[2]._id,
              name: systems[2].name,
            },
            {
              _id: systems[3]._id,
              name: systems[3].name,
            }
          ])
          response.body = JSON.parse(response.body)
          expect(response.body).toEqual({
            systems: [
              {
                _id: systems[0]._id.toString(),
                name: systems[0].name,
              },
              {
                _id: systems[1]._id.toString(),
                name: systems[1].name,
              },
              {
                _id: systems[2]._id.toString(),
                name: systems[2].name,
              },
              {
                _id: systems[3]._id.toString(),
                name: systems[3].name,
              }
            ]
          })
        })
    })
    .then(done);
  });
});
