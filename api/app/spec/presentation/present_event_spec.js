describe('presentEvent', function () {
  var fn = require('../../presentation/present_event.js');
  
  it('presents event', function (done) {
    var payload = {
      events: [
        {
          name: Math.random(),
          description: 'es el mejor evento ever',
          frequency: 'de lunes a viernes'
        },
        {
          name: Math.random(),
          description: 'es el segundo mejor evento ever',
          frequency: 'sabados'
        },
        {
          name: Math.random(),
          description: 'es el peor evento ever',
          frequency: 'domingos'
        } 
      ], 
      otraCosa: Math.random()
    }
    
    fn(payload).then(function (response) {
      expect(response).toEqual({ events: payload.events })
      done();
    });
  });
});