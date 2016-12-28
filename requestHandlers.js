var fs   = require('fs');
var path = require('path');

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

function login(response, request) {
  console.log('/login 핸들러가 실행되었습니다');

  response.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"});
  response.end();

  console.log('/login 에 대한 응답을 완료하였습니다');
}

function signup(response, request) {
  console.log('/signup 핸들러가 실행되었습니다');

  response.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"});
  response.end();

  console.log('/signup 에 대한 응답을 완료하였습니다');
}

exports.main   = main;
exports.login  = login;
exports.signup = signup;
