describe('validateEventType', function(){
  var fn = require ('../../data/validate_event_type.js')

  it('validate event sucesfully', function(done) {
    var payload = {
      newEvent : {
        name: Math.random(),
        fields: [ { name: Math.random() } ]
      }
    }
    fn(payload).then(function(response) {
      expect(response).toBe(payload)
      done();
    })
  })

  it('payload without newEvent', function(done) {
    var payload = {};
    fn(payload).catch(function(response) {
      expect(response).toEqual( { 'newEvent' : 'MISSING' } )
      done();
    });
  });

  it('payload without newEvent.*', function(done) {
    var payload = { newEvent : { } };
    fn(payload).catch(function(response){
      expect(response).toEqual({
        'newEvent.name' : 'MISSING',
        'newEvent.fields': 'MISSING',
      });
      done();
    })
  })

  it('payload with newEvent.fields but array is empty', function(done) {
    var payload = {
      newEvent : {
        name: Math.random(),
        fields : []
      }
    }
    fn(payload).catch(function(response) {
      expect(response).toEqual( { 'newEvent.fields' : 'EMPTY' } )
      done();
    })
  });

  it('missing newEvent.fields.name', function (done) {
    var payload = {
      newEvent : {
        name: Math.random(),
        fields: [{}]
      }
    };
    fn(payload).catch(function(response) {
      expect(response).toEqual({ 'newEvent.fields.name' : 'MISSING' });
      done();
    });
  });
});
