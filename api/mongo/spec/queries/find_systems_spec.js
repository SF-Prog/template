var connect = require('../../connect.js');

describe('findSystems', function(){
  
  var fn = require('../../queries/find_systems.js'),
  db,
  systems;

  beforeEach(function () {
    return connect.connect()
    .then(function (database) { db = database; })
    .then(function () {
      db.dropDatabase();
      systems = [
        { name: Math.random() },
        { name: Math.random() },
        { name: Math.random() },
        { name: Math.random() }
      ];
      return db.collection('systems').insertMany(systems);
    });
   });

  it('returns systems list', function (done) {
    fn().then(function (response) {
      expect(response).toEqual([ 
        systems[0], 
        systems[1], 
        systems[2], 
        systems[3] 
      ])
      done();
    })
  });
});
