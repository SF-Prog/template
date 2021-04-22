module.exports = function presentSystems(payload) {
  return Promise.resolve({ systems: payload.systems });
};
