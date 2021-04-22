function getSystems (strategy) {
  return function (payload){
    return Promise.resolve(payload)
    .then(getSystemsListApi(strategy.makeHttpRequest))
    .then(getSystemsListEvent(strategy.sendEvent))
  }
}
