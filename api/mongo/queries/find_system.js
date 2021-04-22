var objectId = require('../object_id.js');

module.exports = async function findSystem (_id) {
  var db = await require('../connect.js').connect();
  return await db.collection('systems').findOne({ _id: objectId(_id) })
}
