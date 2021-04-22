module.exports = function presentEventType(payload) {
  return Promise.resolve({ eventType: payload.eventType })
}
