var findSystem = require('../data/find_system.js')
  , findStreams = require('../data/find_streams.js')
  , presentStreams = require('../presentation/present_streams.js');

module.exports = function getStreams(strategy) {
  return function (payload) {
    return Promise.resolve(payload)
      .then(findSystem({ findSystem: strategy.findSystem }))
      .then(findStreams({ findStreams: strategy.findStreams }))
      .then(presentStreams)
  }
}