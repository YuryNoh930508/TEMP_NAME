var fs   = require('fs');
var path = require('path');
var util = require('util');
var querystring = require('querystring');

function main(response, request) {
  console.log('/main 핸들러가 실행되었습니다');

  var file_path   = path.join(__dirname, 'main.html');
  var read_stream = fs.createReadStream(file_path);

  response.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"});
  response.on('error', (err) => {
    read_stream.end();
  });

  read_stream.pipe(response);
  read_stream.on('data', (chunk) => {
    console.log(`  ${chunk.length} 바이트의 데이터를 수신하였습니다`);
  });
  read_stream.on('end', () => {
    console.log('/main 에 대한 응답을 완료하였습니다');
  });
}

function login_form(response, request) {
  console.log('/login 핸들러가 실행되었습니다');

  response.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"});
  response.end();

  console.log('/login 에 대한 응답을 완료하였습니다');
}

function signup_form(response, request) {
  if(request.method.toLowerCase() === 'get') {
    var file_path   = path.join(__dirname, 'signup_form.html');
    var read_stream = fs.createReadStream(file_path);

    response.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"});
    response.on('error', (err) => {
      read_stream.end();
    });

    read_stream.pipe(response);
    read_stream.on('data', (chunk) => {
      console.log(`  ${chunk.length} 바이트의 데이터를 수신하였습니다`);
    });
    read_stream.on('end', () => {
      console.log('/signup 에 대한 응답을 완료하였습니다');
    });
  }
}
function signup(response, request) {
  if(request.method.toLowerCase() === 'post') {
    var body = '';

    request.on('data', (data) => {
      body += data;

      // 너무 많은 POST 데이터가 보내지면 연결을 끊는다
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) { // === FLOOD ATTACK || FAULTY CLIENT || NUKE REQUEST
        request.connection.destroy();
      }
    });
    request.on('end', () => {
      var post = querystring.parse(body);
      for(fields in post) {
        console.log(fields + ':' + post[fields]);
      }
    });
  }
}

exports.main        = main;
exports.login_form  = login_form;
exports.signup_form = signup_form;
exports.signup      = signup;
