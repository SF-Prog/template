var findStream = require('../data/find_stream.js')
, findEvents = require('../data/find_events.js')
, presentEvent = require('../presentation/present_event.js');

module.exports = function getEvents (strategy) {
  return function (payload) {
    return Promise.resolve(payload)
    .then(findStream({ findStream: strategy.findStream }))
    .then(findEvents({ findEvents: strategy.findEvents }))
    .then(presentEvent)
  }
};