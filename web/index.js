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

function makeHttpRequest(input){
  return fetch(API_URL + input.path, {
    method : 'POST',
    body : input.body
  }).then(function(response) {
    return response.json()
  })
}

function sendEvent(options) {
  var event = new Event(options.type);
  event.data = options.data;
  window.dispatchEvent(event);
}
function unwatchEvent(type, callback) {
  window.removeListener(type, callback);
}
function watchEvent(type, callback) {
  window.addEventListener(type, callback);
}
function getStreams(actions) {
  Vue.component('get-streams-list', {
    data: function () {
      return { streams: [ { _id: Math.random() }, { _id: Math.random() } ] };
    },

    mounted: function () {
      watchEvent('getStreams', this.onGetStreams);
    },

    beforeDestroy: function () {
      unwatchedEvent('getStreams', this.onGetStreams)
    },

    methods: {
      onGetStreams: function (event) {
        console.log('consiguio los streams', event.data);
      },
      onClick: function (event) {
        event.preventDefault();
        actions.getStreamsAction({})
      }
    },

    template: `
      <div>
        <h1>Get Streams</h1>
        <div><button v-on:click="onClick">Get</button></div>
        <div>
          <ul>
            <li v-for="stream in streams"> {{ stream._id }}</li>
          </ul>
        </div>
      </div>
    `
  })
}
function layout(actions) {
  Vue.component('layout', {
    template: `
      <div>
        <systems-list></systems-list>
        <streams-list></streams-list>
        <hr />
        <new-system-form></new-system-form>
        <new-stream-form></new-stream-form>
      </div>
    `
  });
}
function newStreamForm (actions) {
  Vue.component('new-stream-form', {
    data: function () {
      return {
        system: null,
        newStream: {}
      };
    },
    
    mounted: function () {
      watchEvent('streamAdded', this.onStreamAdded);
      watchEvent('systemSelected', this.onSystemSelected);
    },
    
    beforeDestroy: function () {
      unwatchEvent('streamAdded', this.onStreamAdded);
      unwatchEvent('systemSelected', this.onSystemSelected);
    },
    
    methods: {
      onStreamAdded: function () {
        this.newStream = {};
      },
      onSystemSelected: function (event) {
        this.system = event.data.system;
      },
      onSubmit: function (event) {
        event.preventDefault();
        actions.addStream({
          systemId: this.system._id,
          name: this.newStream.name 
        });
      }
    },

    template: `
    <div v-if="system">
      <h2>New Stream ({{system.name}})</h2>
      <form v-on:submit="onSubmit">
        <p>Stream name</p>
        <div><input v-model="newStream.name" /></div>
        <div><button>Add</button></div>
      </form>
    </div>
    `
  });
} 
function newSystemForm(actions) {
  Vue.component('new-system-form', {
    data: function () {
      return { newSystem: {} };
    },

    mounted: function () {
      watchEvent('systemAdded', this.onSystemAdded);
    },

    beforeDestroy: function () {
      unwatchEvent('systemAdded', this.onSystemAdded);
    },

    methods: {
      onSystemAdded: function (event) {
        this.newSystem = {};
      },
      onSubmit: function (event) {
        event.preventDefault();
        actions.addSystem({ name: this.newSystem.name });
      }
    },
    
    template: `
      <div>
        <h1>New system</h1>
        <form v-on:submit="onSubmit">
          <p>Name</p>
          <div><input v-model="newSystem.name" /></div>
          <div><button>Save</button></div>
        </form>
      </div>
    `
  });
}
function streamsList(actions) {
  Vue.component('streams-list', {
    data: function () {
      return { streams: [] };
    },

    mounted: function () {
      watchEvent('systemSelected', this.onSystemSelected);
      watchEvent('streamAdded', this.onStreamAdded);
    },

    beforeDestroy: function () {
      unwatchEvent('systemSelected', this.onSystemSelected);
      unwatchEvent('streamAdded', this.onStreamAdded);
    },

    methods: {
      onSystemSelected: function (event) {
        actions.getStreams(event.data.system._id);
      },
      onStreamAdded: function (event) {
        console.log(event.data)
        this.streams.push(event.data.stream);
      },
      selectStream: function (event, stream) {
        event.preventDefault();
        sendEvent({
          type: 'streamSelected',
          data: { stream: stream }
        })
      }
    },

    template: `
      <div>
        <h1>Streams</h1>
        <p v-if="!streams.length">No hay streams</p>
        <ul v-if="streams.length">
          <li v-for="stream in streams" v-on:click="selectStream($event, stream)">
            {{stream.name}}
          </li>
        </ul>
      </div>
    `
  });
}
function systemsList(actions) {
  Vue.component('systems-list', {
    data: function () {
      return { systems: [] };
    },

    mounted: function () {
      watchEvent('systemsObtained', this.onSystemsObtained);
      watchEvent('systemAdded', this.onSystemAdded);
      actions.getSystems({});
    },
    
    beforeDestroy: function () {
      unwatchEvent('systemsObtained', this.onSystemsObtained);
      unwatchEvent('systemAdded', this.onSystemAdded);
    },

    methods: {
      onSystemsObtained: function (event) {
        this.systems = event.data.systems;
      },
      onSystemAdded: function (event) {
        this.systems.push(event.data.system);
      },
      selectSystem: function (event, system) {
        event.preventDefault();
        sendEvent({
          type: 'systemSelected',
          data: { system: system }
        });
      }
    },

    template: `
      <div>
        <h1>Systems</h1>
        <p v-if="!systems.length">No hay systems</p>
        <ul v-if="systems.length">
          <li v-for="system in systems">
            <a v-on:click="selectSystem($event, system)" href="">
              {{system.name}}
            </a>
          </li>
        </ul>
      </div>
    `
  });
}