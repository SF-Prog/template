module.exports = async function findSystems () {
  var db = await require('../connect.js').connect();
  return db.collection('systems').find().toArray();
};
