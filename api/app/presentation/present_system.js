module.exports = function presentSystem (payload) {
  return Promise.resolve({
    system: payload.system
  });
}
