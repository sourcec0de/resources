var resource = require('resource'),
    view = resource.define('view');

view.schema.description = "templating / markup engine with 22+ supported languages";

view.property("path", {
  "type": "string",
  "default": ".", 
  "description": "the path to the view",
  "format": "uri" 
});

view.property("template", {
  "type": "string",
  "description": "the string template of the view"
});

view.property("input", {
  "type": "string"
});

view.property("output", {
  "type": "string"
});

view.method('create', create, {
  "description": "creates a new view",
  "properties": view.schema.properties
});

function create (options, callback) {
  var viewful = require('viewful');
  options = options || {};
  //
  // TODO: move this delegation / conditional logic to inside view engine
  //
  if(typeof options.template !== 'undefined') {
    var view = new viewful.View({
      template: options.template,
      input: options.input,
      output: options.ouput
    });
  } else {
    var view = new viewful.View({
      path: options.path,
      input: options.input,
      output: options.ouput
    });
  }
  return view;
}

exports.view = view;

exports.dependencies = {
  "viewful": "*"
};