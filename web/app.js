(function () {
  
  var actions = {
    getSystems: function () {},
    getStreams: function () {},
    addSystem: addSystem({
      sendEvent : sendEvent,
      makeHttpRequest : makeHttpRequest
    }),
    getSystems: getSystems({
      sendEvent : sendEvent,
      makeHttpRequest : makeHttpRequest
    }),
    addStream: addStream({
      sendEvent: sendEvent,
      makeHttpRequest: makeHttpRequest
    })
  };

  layout(actions);
  newStreamForm(actions);
  newSystemForm(actions);
  systemsList(actions);
  streamsList(actions);
  
  new Vue({ el: '#app' });
})();