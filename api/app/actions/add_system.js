var validateSystem = require('../data/validate_system.js')
  , saveSystem = require('../data/save_system.js')
  , presentSystem = require('../presentation/present_system.js')

module.exports = function (strategy) {
  return function (payload){
    return Promise.resolve(payload)
    .then(validateSystem)
    .then(saveSystem({ saveSystem: strategy.saveSystem }))
    .then(presentSystem)
  }
}
