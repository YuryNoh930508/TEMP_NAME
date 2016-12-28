var http = require('http');
var url  = require('url');

function start(route, handle) {
  http.createServer((request, response) => {
    request.setEncoding('utf8');

    var path_name = url.parse(request.url).pathname;

    if(path_name === '/favicon.ico') {
      console.log(`${path_name} 에 대한 요청을 차단하였습니다`);

      return;
    } else {
      console.log(`${path_name} 에 대한 요청이 있습니다`);

      route(handle, path_name, response, request);
    }
  }).listen(8888);

  console.log('서버가 시작되었습니다');
}

exports.start = start;
