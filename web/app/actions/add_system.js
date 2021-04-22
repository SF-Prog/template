function addSystem(strategy){
  return function (payload){
    return Promise.resolve(payload)
    .then(addSystemAPI(strategy.makeHttpRequest))
    .then(sendSystemAddedEvent(strategy.sendEvent))
  }
}
