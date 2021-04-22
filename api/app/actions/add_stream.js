var validateStream = require('../data/validate_stream.js')
  , saveStream = require('../data/save_stream.js')
  , presentStream = require('../presentation/present_stream.js')

module.exports = function addStream (strategy) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(validateStream)
    .then(saveStream ( { saveStream: strategy.saveStream } ))
    .then(presentStream)
  }
}