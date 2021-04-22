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