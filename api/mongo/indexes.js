var mongo = require('./connect.js');

mongo.connect()
.then(function (db) {
  return Promise.all([
    db.collection('users').createIndex({ email: 1 })
  ]);
})
.then(mongo.close);
