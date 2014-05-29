
var inspect = require('util').inspect;

var layoutParentTmpl = '<DOCTYPE HTML><html><header><title>{{title}}</title></header><body>{{outlet}}</body></html>';
var layoutNestedTmpl = '<div><ul><li>Home</li><li>About</li></ul>{{outlet}}</div>';
var layoutChildTmpl = '<div>{{title}}</div><div>{{outlet}}</div>';

var pageTmpl = 'This is the page';


var Handlebars = require('handlebars');

var outlet = function (options) {
  console.log('outlet::options', inspect(options, null, 10));
  var tree = options.data.root.layoutTree;
  var content = '';
  if (tree.layout) {
    var layout = options.data.root.layouts[tree.layout.name];
    options.data.root.layoutTree = tree.layout;
    content = layout(options.data.root);
  } else if (tree.page) {
    content = tree.page(options.data.root);
  }
  return new Handlebars.SafeString(content);
};

Handlebars.registerHelper('outlet', outlet);

var layoutParentFn = Handlebars.compile(layoutParentTmpl);
var layoutNestedFn = Handlebars.compile(layoutNestedTmpl);
var layoutChildFn = Handlebars.compile(layoutChildTmpl);
var pageFn = Handlebars.compile(pageTmpl);

var data = {
  title: 'Layout Test',
  layouts: {
    'parent': layoutParentFn,
    'nested': layoutNestedFn,
    'child': layoutChildFn
  },
  layoutTree: {
    layout: {
      name: 'nested',
      layout: {
        name: 'child',
        page: pageFn
      }
    }
  }
};

var page1 = layoutParentFn(data);
//var layoutNested = layoutNestedFn(data);
//var layoutChild = layoutChildFn(data);
//var page = pageFn(data);

var data = {
  title: 'Layout Test 2',
  layouts: {
    'parent': layoutParentFn,
    'nested': layoutNestedFn,
    'child': layoutChildFn
  },
  layoutTree: {
    layout: {
      name: 'nested',
      page: pageFn
    }
  }
};

var page2 = layoutParentFn(data);


console.log('page1', page1);
console.log();
console.log('page2', page2);
console.log();

