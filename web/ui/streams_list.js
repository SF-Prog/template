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