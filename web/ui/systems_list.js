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