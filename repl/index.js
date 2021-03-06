var resource = require('resource'),
repl = resource.define('repl');

repl.schema.description = "enables an interactive Read-Eval-Print-Loop ( REPL )";

repl.method('start', function() {
  resource.logger.warn('STDIN will now be processed in a Read-Eval-Print-Loop');
  resource.logger.help('try console logging the "big" object');
  require('repl').start("> ").context.big = resource;
});

exports.repl = repl;