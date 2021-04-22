var connect = require('../../connect.js')
, objectId = require('../../object_id.js');

describe('findEvents', function () {
  var fn = require('../../queries/find_events.js')
  , db
  , streamId
  , events;
  
  beforeEach(function (done) {
    connect.connect()
    .then(function (database) {db = database;})
    .then(function () { return db.dropDatabase(); })
    .then(function () {
      streamId = objectId();
      events = [
        {
          streamId: streamId,
          name: Math.random()
        },
        {
          streamId: streamId,
          name: 'eventicoBueno'
        },
        {
          streamId: Math.random(),
          name: 'eventicoMalo'
        }
      ]
      return db.collection('events').insertMany(events);
    })
    .then(done)  
  })
  
  it('Finds events by streamId', function (done) {
    fn(streamId).then(function (response) {
      expect(response).toEqual([ events[0], events[1] ])
      expect(response[0].streamId).toEqual(events[0].streamId)
      done();
    })
  })
  
  it('it does not find events by streamId', function (done) {
    var diferentStreamId = objectId();
    fn(diferentStreamId).then(function (response) {
      expect(response).toEqual([])
      done();
    });
  });
});