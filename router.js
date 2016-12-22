function route(handle, path_name, res) {
  console.log(path_name + " 요청에 대한 핸들러로 라우팅할 예정입니다");

  if(typeof handle[path_name] === 'function') {
    handle[path_name](res);
  } else {
    console.log(path_name + " 요청에 대한 핸들러가 존재하지 않습니다");
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 Not Found");
    res.end();
  }
}

exports.route = route;
