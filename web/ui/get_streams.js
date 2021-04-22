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