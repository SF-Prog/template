var objectId = require('../object_id.js');

module.exports = async function findEvents (streamId) {
  var db = await require('../connect.js').connect();
  return await db.collection('events')
  .find({ streamId: objectId(streamId) })
  .toArray();
}