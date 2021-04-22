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