(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'backbone', 'exports'], function(_, $, Backbone, exports) {
      root.Paradocs = factory(root, exports, Backbone, _, $);
    });
  } else {
    root.Paradocs = factory(root, {}, root.Backbone, root._, (root.jQuery || root.$));
  }
}(this, function(root, Paradocs, Backbone, _, $) {
  Paradocs.VERSION = 0.5;

  var DocsModel = Backbone.Model.extend({});
  var AppRouter = Backbone.Router.extend({
    routes: {"docs/*tech": 'docs'},
    docs: function(filepath){ Paradocs.fetch(filepath) }
  });
  Paradocs.fetch = function (filepath) {
    $.ajax({
      headers: {Accept : "application/vnd.github.VERSION.html+json"},
      url: "https://api.github.com/repos/tsironis/dockie/contents/"+filepath+".md",
      type: "GET",
    }).done(function(html) {
      Paradocs.save(html, filepath);
    });
  };
  Paradocs.populateNavItems = function(html) {
    return _.map($('h2', html), function(el) {
      return '<li>'+$(el).text()+'</li>';
    }).join('');
  };
  /* Saves text in a Model for future use */
  Paradocs.save = function(html) {
    this._data.set({
      'text': html,
      'nav' : this.populateNavItems(html)
    });
  };
  Paradocs.get = function (key) {
    return this._data.get(key);
  };

  Paradocs._data = new DocsModel();
  Paradocs.router = new AppRouter();
  Backbone.history.start();

  return Paradocs;
}));
