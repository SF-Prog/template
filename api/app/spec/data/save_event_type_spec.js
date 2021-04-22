describe('saveEventType', function () {
  var factory = require('../../data/save_event_type.js')
  , fn;

  function saveEventType(params){
    saveEventType.params = params;
    saveEventType.result = { _id : Math.random() }
    return Promise.resolve(saveEventType.result)
  }

  it('saveEventType sucesfully', function (done) {
    fn = factory ( { saveEventType : saveEventType } )
    var payload = {
      newEventType : {
        name : Math.random(),
        fields : [ { name: Math.random() } ]
      },
      stream : { _id : Math.random() }
    }
    fn(payload).then(function(response) {
      expect(response).toBe(payload)
      expect(saveEventType.params).toEqual({
        newEventType : {
          name : payload.newEventType.name,
          fields : payload.newEventType.fields,
        },
        stream : {
          _id : payload.stream._id
        }
      })
      expect(response.eventType).toBe(saveEventType.result)
      done();
    })
  })
})
