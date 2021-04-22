module.exports = function presentEvent (payload) {
  return Promise.resolve({ events: payload.events })
};