module.exports = function createServer(routes) {
  var server = require('http').createServer();

  function mapUrlUsecase(request) {
    return routes[request.url];
  }

  function readRequestBody(request) {
    return new Promise(function (resolve) {
      request.body = [];
      request.on('data', function (data) {
        request.body.push(data.toString());
      });
      request.on('end', function () {
        var body = request.body.join('');
        body = JSON.parse(body);
        resolve(body);
      });
    });
  }

  function usecaseNotFound(response) {
    response.writeHead(404, {});
    response.end('');
  }

  server.on('request', async function (request, response) {
    var usecase = mapUrlUsecase(request);
    var payload = await readRequestBody(request);
    if (!usecase) return usecaseNotFound(response);
    usecase(payload)
      .then(function (payload) {
        response.writeHead(200, {});
        response.end(JSON.stringify(payload));
      })
      .catch(function (errors) {
        response.writeHead(400, {});
        response.end(JSON.stringify(errors));
      });
  });

  return server;
};
