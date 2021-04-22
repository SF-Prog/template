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