module.exports = function presentStream (payload) {
  return Promise.resolve({ stream: payload.stream });
};