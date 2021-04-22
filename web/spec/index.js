function addStream (strategy) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(addStreamAPI(strategy.makeHttpRequest))
    .then(sendStreamAddedEvent(strategy.sendEvent))
  };
};
function addSystem(strategy){
  return function (payload){
    return Promise.resolve(payload)
    .then(addSystemAPI(strategy.makeHttpRequest))
    .then(sendSystemAddedEvent(strategy.sendEvent))
  }
}

function getStreamsAction(strategy) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(getStreamsAPI(strategy.makeHttpRequest))
    .then(getStreamsSendEvent(strategy.sendEvent))
  }
}
function getSystems (strategy) {
  return function (payload){
    return Promise.resolve(payload)
    .then(getSystemsListApi(strategy.makeHttpRequest))
    .then(getSystemsListEvent(strategy.sendEvent))
  }
}

function getStreamsSendEvent(sendEvent) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return sendEvent({
        type: 'getStreams',
        data: {
          streams: payload.streams
        }
      })
    })
    .then(function () {
      return payload
    })
  }
}
function getSystemsListEvent (sendEvent) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return sendEvent({
        type: 'systemsObtained',
        data: { systems: payload.systems }
      })
    })
    .then(function () {
      return payload;
    })
  }
}
function sendStreamAddedEvent (sendEvent) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return sendEvent ({
        type: 'streamAdded',
        data: { stream: payload.stream}
      })
    })
    .then(function () {
      return payload;
    })
  };
};
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

function addStreamAPI (makeHttpRequest) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return makeHttpRequest({
        path: '/add_stream',
        body: JSON.stringify({
          system: { _id: payload.systemId },
          newStream: { name: payload.name }
        })
      })
    })
    .then(function (result) {
      payload.stream = result.stream;
      return payload;
    });
  };
};
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

function getStreamsAPI(makeHttpRequest) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(function () {
      return makeHttpRequest({
        path: '/get_streams',
        body: JSON.stringify({
          system: { _id: payload.system._id }
        })
      })
    })
    .then(function (response) {
      payload.streams = response.streams;
      return payload
    })
  }
}
function getSystemsListApi (makeHttpRequest) {
  return function (payload) {
    return Promise.resolve()
    .then(function () {
      return makeHttpRequest ({
        path : '/get_systems',
        body: JSON.stringify({})
      })
    })
    .then(function (result) {
      payload.systems = result.systems;
      return payload;
    })
  }
}

describe('addStream', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }
  
  function makeHttpRequest(params){
    makeHttpRequest.params = params;
    makeHttpRequest.result = { stream: Math.random() };
    return Promise.resolve(makeHttpRequest.result);
  }
  
  it('Calls API to send stream and notifies event', function (done) {
    var payload = { 
      name: Math.random(),
      systemId: Math.random() // esto se va a tomar de la funcion de fito?
     }
    var fn = addStream({
      makeHttpRequest: makeHttpRequest,
      sendEvent: sendEvent
    })
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/add_stream',
        body: JSON.stringify({
          system: { _id: payload.systemId },
          newStream: { name: payload.name }
        })
      })
      expect(sendEvent.params).toEqual({
        type: 'streamAdded',
        data: { stream: makeHttpRequest.result.stream }
      })
      done();
    });
  });
});
describe('addSystem', function (){
  function sendEvent(params){
    sendEvent.params = params;
  }

  function makeHttpRequest(params){
    makeHttpRequest.params = params;
    makeHttpRequest.result = { system: Math.random() };
    return Promise.resolve(makeHttpRequest.result);
  }

  it('Calls api and notify events', function(done) {
    var payload = { name : Math.random() }
    var fn = addSystem({
      sendEvent : sendEvent,
      makeHttpRequest : makeHttpRequest
    })
    fn(payload).then(function(response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/add_system',
        body: JSON.stringify({
          newSystem : {
            name : payload.name
          }
        })
      })
      expect(sendEvent.params).toEqual({
        type: 'systemAdded',
        data: {
          system: makeHttpRequest.result.system
        }
      })
      done();
    })
  })
})

describe('getStreamsAction', function () {
  
  function sendEvent (params) {
    sendEvent.params = params;
  }

  function makeHttpRequest (params) {
    makeHttpRequest.params = params;
    makeHttpRequest.result = { streams: Math.random() };
    return Promise.resolve(makeHttpRequest.result)
  }

  it('calls api and notify', function (done) {
    var payload = { system: { _id: Math.random() } }
    fn = getStreamsAction({
      sendEvent: sendEvent,
      makeHttpRequest: makeHttpRequest
    })
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/get_streams',
        body: JSON.stringify({
          system: { _id: payload.system._id } 
        })
      })
      expect(sendEvent.params).toEqual({
        type: 'getStreams',
        data: { streams: makeHttpRequest.result.streams }
      })
      done();
    });
  });
});
describe('getSystems', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }

  function makeHttpRequest (params) {
    makeHttpRequest.params = params;
    makeHttpRequest.result = {
      systems: [
        { name: Math.random(), _id: Math.random() },
        { name: Math.random(), _id: Math.random() },
        { name: Math.random(), _id: Math.random() },
        { name: Math.random(), _id: Math.random() }
      ]
    };
    return Promise.resolve(makeHttpRequest.result);
  }

  it('Calls getSystemsAPI and sends getSystemEvent', function (done) {
    var payload = {};
    var fn = getSystems({
      sendEvent : sendEvent,
      makeHttpRequest : makeHttpRequest
    });
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/get_systems',
        body: JSON.stringify({})
      })
      expect(sendEvent.params).toEqual({
        type: 'systemsObtained',
        data: { systems: makeHttpRequest.result.systems }
      })
    })
    done();
  });
});
describe('addStreamAPI', function () {
  function makeHttpRequest (params) {
    makeHttpRequest.params = params;
    makeHttpRequest.result = { stream: Math.random() }; 
    return Promise.resolve(makeHttpRequest.result);
  }
  
  it('calls api to add stream', function (done) {
    var payload = { 
      system: { systemId: Math.random() },
      newStream: { name: Math.random() }
    }
    fn = addStreamAPI (makeHttpRequest)
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/add_stream',
        body: JSON.stringify({
          system: { _id: payload.systemId },
          newStream: { name: payload.name }
        })
      })
      expect(response.stream).toEqual(makeHttpRequest.result.stream)
      expect(response).toEqual(payload)
    })
    done();
  });
});
describe('addSystemAPI', function(){
  function makeHttpRequest(params){
    makeHttpRequest.params = params;
    makeHttpRequest.result = { system: Math.random() };
    return Promise.resolve(makeHttpRequest.result);
  }

  it('calls api', function(done) {
    var payload = {name: Math.random()}
    var fn = addSystemAPI(makeHttpRequest)
    fn(payload).then(function(response){
      expect(makeHttpRequest.params).toEqual({
        path: '/add_system',
        body: JSON.stringify({
          newSystem : {
            name : payload.name
          }
        })
      })
      expect(response.system).toEqual(makeHttpRequest.result.system);
      expect(response).toBe(payload);
    })
    done();
  })
});

describe('getStreamsAPI', function () {
  function makeHttpRequest(params) {
    makeHttpRequest.params = params;
    makeHttpRequest.result = { streams: Math.random() };
    return Promise.resolve(makeHttpRequest.result);
  }

  it('it call the api', function (done) {
    var payload = { system: { _id: Math.random() } }
    var fn = getStreamsAPI(makeHttpRequest)
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/get_streams',
        body: JSON.stringify({
          system: { _id: payload.system._id }
        })
      })
      expect(response.streams).toEqual(makeHttpRequest.result.streams);
      expect(response).toBe(payload)
      done();
    })
  })
})
describe('getSystemsListAPI', function () {
    function makeHttpRequest (params) {
      makeHttpRequest.params = params;
      makeHttpRequest.result = {
        systems: [
          { name: Math.random(), _id: Math.random() },
          { name: Math.random(), _id: Math.random() },
          { name: Math.random(), _id: Math.random() },
          { name: Math.random(), _id: Math.random() }
        ]
      };
      return Promise.resolve(makeHttpRequest.result);
   }

   it('calls getSystems api', function (done) {
    var payload = {};
    var fn = getSystemsListApi(makeHttpRequest);
    fn(payload).then(function (response) {
      expect(makeHttpRequest.params).toEqual({
        path: '/get_systems',
        body: JSON.stringify({})
      })
      expect(response.systems).toEqual(makeHttpRequest.result.systems)
      expect(response).toBe(payload)
    })
    done();
  })
});

describe('getStreamsSendEvent', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }

  it('sends event', function (done) {
    var payload = { streams: [ {}, {} ]}
    var fn = getStreamsSendEvent(sendEvent)
    fn(payload).then(function (response) {
      expect(response).toBe(payload)
      expect(sendEvent.params).toEqual({
        type: 'getStreams',
        data: {
          streams: payload.streams
        }
      })
      done();
    });
  });
});
describe('getSystemsListEvent', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }

  it('send getSystemsList event', function (done) {
    var payload = {};
    var fn = getSystemsListEvent(sendEvent);
    fn(payload).then(function (response) {
      expect(response).toBe(payload)
      expect(sendEvent.params).toEqual({
        type: 'systemsObtained',
        data: { systems: response.systems }
      })
      done();
    });
  });
});
describe('sendStreamAddedEvent', function () {
  function sendEvent (params) {
    sendEvent.params = params;
  }
  
  it('sends event', function (done) {
    var payload = { stream: Math.random() };
    var fn = sendStreamAddedEvent(sendEvent);
    fn(payload).then(function (response) {
      expect(response).toBe(payload);
      expect(sendEvent.params).toEqual({
        type: 'streamAdded',
        data: {stream: payload.stream }
      })
    })
    done();
  });
});
describe('sendSystemAddedEvent', function() {
  function sendEvent(params){
    sendEvent.params = params;
  }
  
  it('send event', function(done) {
    var payload = { system : Math.random() }
    var fn = sendSystemAddedEvent(sendEvent)
    fn(payload).then(function(response){
      expect(response).toBe(payload)
      expect(sendEvent.params).toEqual({
        type: 'systemAdded',
        data: {
          system: payload.system
        }
      })
      done();
    })
  })
})
