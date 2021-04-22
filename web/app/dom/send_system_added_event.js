function sendSystemAddedEvent(sendEvent){
  return function(payload){
    return Promise.resolve()
    .then(function (){
      return sendEvent({
        type: 'systemAdded',
        data: {
          system: payload.system
        }
      })
    })
    .then(function() {
      return payload;
    })
  }
}
