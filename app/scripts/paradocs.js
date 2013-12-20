(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'backbone', 'exports'], function(_, $, Backbone, exports) {
      root.Paradocs = factory(root, exports, Backbone, _, $);
    });
  } else {
    root.Paradocs = factory(root, {}, root.Backbone, root._, (root.jQuery || root.$));
  }
}(this, function(root, Paradocs, Backbone, _, $){
  Paradocs.VERSION = 0.1;

  var AppRouter = Backbone.Router.extend({
    routes: {"docs/*tech": 'docs'},
    docs: function(filepath){ Paradocs.get(filepath) }
  });
  Paradocs.get = function (filepath) {
    $.ajax({
      headers: {Accept : "application/vnd.github.VERSION.html+json"},
      url: "https://api.github.com/repos/tsironis/dockie/contents/"+filepath+".md",
      type: "GET",
    }).done(function(html) {
      Paradocs.render(html, filepath);
    });
  };
  Paradocs.render = function(html, filepath) {
    $('ul li ul').empty();
    $( "#docs" ).empty().html(html);
    _.each($('#docs h2'), function(el) {
      $('ul', '#'+filepath).append('<li>'+$(el).text()+'</li>');
    });
  };

  Paradocs.router = new AppRouter();
  Backbone.history.start();

  return Paradocs;
}));
