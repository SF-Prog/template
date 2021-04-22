module.exports = function server(override) {
  var deps = {
    saveSystem: require('./mongo/queries/save_system.js'),
    saveStream: require('./mongo/queries/save_stream.js'),
    findSystems: require('./mongo/queries/find_systems.js'),
    findStreams: require('./mongo/queries/find_streams.js'),
    findSystem: require('./mongo/queries/find_system.js'),
  };

  Object.assign(deps, override);

  var routes = {
    '/add_system': require('./app/actions/add_system.js')(deps),
    '/add_stream': require('./app/actions/add_stream.js')(deps),
    '/get_systems': require('./app/actions/get_systems.js')(deps),
    '/get_streams': require('./app/actions/get_streams.js')(deps)
  };

  var server = require('./http/create_server.js')(routes);

  return server;
};