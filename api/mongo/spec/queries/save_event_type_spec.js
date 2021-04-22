var connect = require('../../connect.js')

describe('saveStream', function () {
  var fn = require('../../queries/save_event_type.js');
  var db;

  beforeEach(function (done) {
    connect.connect()
    .then(function (database) { db = database } )
    .then(function() { return db.dropDatabase(); } )
    .then(done)
  })

  it('Event type sucesfully saved', function (done) {
    var data = {
      newEventType : {
        name : Math.random() ,
        fields : [ { name : Math.random() } ]
      },
      stream : {
        _id : Math.random()
      }
    }
    fn(data).then(function(result) {
      return db.collection('eventsType').findOne()
      .then(function(eventType){
        expect(result).toEqual(eventType)
        expect(eventType).toEqual({
          _id : eventType._id,
          name : data.newEventType.name,
          fields : data.newEventType.fields,
          streamId : data.stream._id
        })
        done();
      });
    });
  });
});
