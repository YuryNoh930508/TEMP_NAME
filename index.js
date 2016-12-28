var server          = require('./server');
var router          = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {
              '/'       : requestHandlers.main,
              '/main'   : requestHandlers.main,
              '/login'  : requestHandlers.login,
              '/signup' : requestHandlers.signup
             };

server.start(router.route, handle);
