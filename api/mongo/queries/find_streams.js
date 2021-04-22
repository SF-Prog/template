var objectId = require('../object_id.js');

module.exports = async function findStreams (systemId) {
  var db = await require('../connect.js').connect();
  return await db.collection('streams')
    .find({ systemId: objectId(systemId) })
    .toArray()
}