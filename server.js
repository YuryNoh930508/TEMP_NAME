var http = require("http");
var url  = require("url");

function start(route, handle) {
  function onRequest(req, res) {
    var path_name = url.parse(req.url).pathname;
    console.log(path_name + " 에 대한 요청이 있습니다");

    route(handle, path_name, res);
  }

  http.createServer(onRequest).listen(8888);
  console.log("서버가 시작되었습니다");
}

exports.start = start;
