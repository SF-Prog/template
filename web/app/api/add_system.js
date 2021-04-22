function addSystemAPI(makeHttpRequest){
  return function(payload){
    return Promise.resolve()
    .then(function() {
      return makeHttpRequest({
        path : '/add_system',
        body: JSON.stringify({
          newSystem : {
            name : payload.name
          }
        })
      })
    })
    .then(function(result){
      payload.system = result.system;
      return payload;
    })
  }
}
