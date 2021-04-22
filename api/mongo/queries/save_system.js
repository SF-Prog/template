module.exports = async function saveSystem(payload){
  var system = { name: payload.name }  
  var db = await require('../connect.js').connect();
  await db.collection('systems').insertOne(system)
  return system;
}
