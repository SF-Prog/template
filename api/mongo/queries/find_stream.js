var connect = require('../connect.js');
var objectId = require('../object_id.js');

module.exports = async function findStream (_id) {
  var db = await connect.connect();
  return await db.collection('streams').findOne({ _id: objectId(_id) })
}