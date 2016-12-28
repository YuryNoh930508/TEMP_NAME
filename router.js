var fs   = require('fs');
var path = require('path');

function route(handle, path_name, response, request) {
  if(typeof handle[path_name] === 'function') {
    console.log(`${path_name} 요청에 대한 핸들러로 라우팅할 예정입니다`);

    handle[path_name](response, request);
  } else { //핸들러가 존재하지 않을시에
    var dot_offset = path_name.lastIndexOf('.');

    if(dot_offset === -1) { //'.'이 포함되지 않을 때
      response.writeHead(404, {"Content-type" : "text/plain;charset=UTF-8"});
      response.write('404 Not Found');
      response.end();

      console.log(`${path_name} 요청에 대한 핸들러가 존재하지 않습니다`);
    } else if(typeof request.headers['referer'] === 'undefined') {
      response.writeHead(404, {"Content-type" : "text/plain;charset=UTF-8"});
      response.write('404 Not Found');
      response.end();

      console.log(`${path_name} 요청에 대한 보안상 잘못된 접근을 차단하였습니다`);
    } else {
      var file_path = path.join(__dirname, path_name.slice(1));
      fs.readFile(file_path, (err, data) => {
        if(!err) {
          var mimetype = {
                          '.html' : 'text/html',
                          '.ico'  : 'image/x-icon',
                          '.jpg'  : 'image/jpeg',
                          '.png'  : 'image/png',
                          '.gif'  : 'image/gif',
                          '.css'  : 'text/css',
                          '.js'   : 'text/javascript'
                         }[path_name.substr(dot_offset)];

          response.setHeader('Content-type', mimetype);
          response.end(data);

          console.log(`${path_name} 에 대하여 ${mimetype} 타입 파일을 응답하였습니다`);
        } else { //파일 읽기 스트림 오류 발생 시
          response.writeHead(404, {"Content-type" : "text/plain;charset=UTF-8"});
          response.write('404 Not Found');
          response.end();

          console.log(`${path_name} 파일을 찾을 수 없습니다`);
        } //end of if(!err) {...}
      }); //end of fs.readFile(..., {...})
    }     //end of if(dot_offset === -1) {...}
  }       //end of if(typeof handle[path_name] === 'function') {...}
}         //end of function route(...) {...}

exports.route = route;
