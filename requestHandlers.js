var exec = require("child_process").exec; // 막힘 없는 실행을 위하여 비싼 작업을 수행하기 위한 자식 실행자

function start(res) {
  console.log("'start' 핸들러가 실행되었습니다");
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("start 헬로");
  res.end();
}

function upload(res) {
  console.log("'upload' 핸들러가 실행되었습니다");
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("upload 헬로");
  res.end();
}

exports.start  = start;
exports.upload = upload;
