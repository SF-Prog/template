describe('presentEventType', function() {
  var fn = require('../../presentation/present_event_type.js');

  it('present event type', function (done) {
    var payload = {
      eventType : {
        _id : Math.random(),
        name : Math.random(),
        fields : Math.random(),
        streamId : Math.random()
      },
      estoNo : { no : Math.random() }
    }

    fn(payload).then(function(result) {
      expect(result).toEqual({
        eventType : {
          _id : payload.eventType._id,
          name : payload.eventType.name,
          fields : payload.eventType.fields,
          streamId : payload.eventType.streamId
        }
      })
      done();
    })
  })
})
