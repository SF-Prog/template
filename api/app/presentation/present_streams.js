module.exports = function presentStreams (payload) {
  return Promise.resolve({ streams: payload.streams })
}