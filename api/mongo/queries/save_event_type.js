module.exports = async function saveEventType (data) {
  var eventType = {
      name : data.newEventType.name,
      fields : data.newEventType.fields,
      streamId : data.stream._id
  }
  var db = await require('../connect.js').connect();
  await db.collection('eventsType').insertOne(eventType)
  return eventType;
}
