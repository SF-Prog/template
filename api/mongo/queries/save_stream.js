module.exports = async function saveStream (payload) {
  var stream = { name: payload.name }
  var db = await require('../connect.js').connect();
  await db.collection('streams').insertOne(stream)
  return stream;
}