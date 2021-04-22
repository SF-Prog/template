var findSystems = require('../data/find_systems.js')
  , presentSystems = require('../presentation/present_systems.js')

module.exports =  function (strategy) {
  return function (input) {
    return Promise.resolve(input)
    .then(findSystems({ findSystems : strategy.findSystems }))
    .then(presentSystems)
  }
};