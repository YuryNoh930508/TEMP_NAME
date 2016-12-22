var http = require("http");
var utl  = require("url");

function start(route, handle) {
  function onRequest(req, res) {
    var path_name = url.parse(req.url).pathname;
    console.log("Request for " + path_name + " received");

    route(handle, path_name, res);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started!");
}

exports.start = start;
