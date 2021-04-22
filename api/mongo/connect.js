var MongoClient = require('mongodb').MongoClient;

var client;

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = {
  connect: function connect() {
    var user = process.env.MONGO_USER
      , pass = encodeURIComponent(process.env.MONGO_PWD)
      , host = process.env.MONGO_HOST
      , name = process.env.MONGO_NAME || 'template-test';

    var url = process.env.MONGO_HOST
      ? `mongodb+srv://${user}:${pass}@${host}/${name}?retryWrites=true&w=majority`
      : 'mongodb://localhost:27017';

    return Promise.resolve()
      .then(function () {
        if (client) return client;
        return MongoClient.connect(url, options);
      })
      .then(function (newClient) {
        client = newClient;
        return client.db(name);
      })
      .catch(function (error) {
        console.log('MONGO CONNECTION ERROR', error);
      });
  },
  close: function close() {
    if (client) {
      client.close();
      client = null;
    }
    return Promise.resolve();
  }
};
