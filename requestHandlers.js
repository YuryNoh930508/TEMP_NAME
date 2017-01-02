var fs   = require('fs');
var path = require('path');
var util = require('util');
var sql_escape = require('sql-escape');
var querystring = require('querystring');

function main(response, request) {
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
function id_duplicate_check(response, request) {
  if (request.method.toLowerCase() === 'post' || typeof request.referer === 'undefined') {
    var body = '';

    request.on('data', (data) => {
      body += data;
      // 너무 많은 POST 데이터가 보내지면 연결을 끊는다
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) { // === FLOOD ATTACK || FAULTY CLIENT || NUKE REQUEST
        request.connection.destroy();
      }
    });
    request.on('end', (data) => {
      var post          = querystring.parse(body);
      var regexp_result = /^(?=.*[a-zA-Z0-9])[\w&#60;\[\]\\\-!?@#$%&#38;^*+=&#34;&#39;;:,.~{}()|/&#62;]{6,200}$/.exec(post['id']);

      /* 정규 표현식 검사를 해서 형식과 일치 하여 null값이 아니거나 검사 문자열의 형식과 일치한 결과와 검사된 문자열을 대조하여 동일할 때 (일부분만 일치하는 것을 방지) */
      if (typeof post['id'] !== 'undefined' && regexp_result !== null && regexp_result[0] === regexp_result['input'] ) {
        /* preparedStatement를 사용하여 sql injection을 검사하여 감지되면 */
        // if(sql_injection) {...} else {밑 코드 }
        if (post['id'] === 'yl0382') {
          response.writeHead(203, {"Content-Type" : "text/html;charset=UTF-8"});
          response.end();
        } else if (post['id'] !== 'yl0382') {
          response.writeHead(200, {"Content-Type" : "text/html;charset=UTF-8"});
          response.end();
        }
      } else {
        response.writeHead(404, {"Content-Type" : "text/html;charset=UTF-8"});
        response.end();
      }
    });
    console.log('/id_duplicate_check 에 대한 응답을 완료하였습니다');
  }
}
function signup(response, request) {
  if (request.method.toLowerCase() === 'post') {
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

exports.main               = main;
exports.login_form         = login_form;
exports.signup_form        = signup_form;
exports.id_duplicate_check = id_duplicate_check;
exports.signup             = signup;
