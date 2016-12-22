function route(handle, path_name, res) {
  console.log("About to route a request for " + path_name);

  if(typeof handle[path_name] === 'function') {
    handle[path_name](res);
  } else {
    console.log("No request handler found for " + path_name);
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404 Not Found");
    res.end();
  }
}

exports.route = route;
