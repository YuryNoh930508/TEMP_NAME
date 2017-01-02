var server          = require('./server');
var router          = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {
              '/'                   : requestHandlers.main,
              '/main'               : requestHandlers.main,
              '/login_form'         : requestHandlers.login_form,
              '/login'              : requestHandlers.login,
              '/signup_form'        : requestHandlers.signup_form,
              '/id_duplicate_check' : requestHandlers.id_duplicate_check,
              '/signup'             : requestHandlers.signup
             };

server.start(router.route, handle);
