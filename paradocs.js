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

  /* Data model that saves HTML, tech & navigation item */
  var Model = Backbone.Model.extend({});
  var data    = new Model();
  var options = new Model();

  /* Utils functions */
  Paradocs.errorTmpl = _.template("<div class='error'><img src='/static/images/landing/home/nofound.png' /><h2>Oops!</h2><p>Something went terribly wrong!</p><p>Please contact us in the support.</p></div>");
  var getURL = function(name) {
    return 'https://api.github.com/repos/'+options.get('repo')+'/contents/'+name+'.md';
  };

  /* Main Paradocs API functions
   * --------------------------- */

  /* Start the Paradocs application */
  Paradocs.start = function(params) {
    if(params.hasOwnProperty('repo')) options.set('repo', params.repo);
    if(params.hasOwnProperty('el'))   options.set('el',   params.el);
    options.set('key', 'h3');

    var router = new Paradocs.Router();
    Backbone.history.start({root: params.root || '' , pushState: true});
  };

  /* Fetching HTML from Github API */
  Paradocs.fetch = function (file) {
    $.ajax({
      headers: {Accept : "application/vnd.github.VERSION.html+json"},
      type: "GET",
      url: getURL(file),
    }).done(function(html) {
      Paradocs.save(html, file);
    }).fail(function() {
      Paradocs.fail.apply();
    });
  };

  /* Saves text in a Model for future use */
  Paradocs.save = function (html, tech) {
    data.set({
      'text': html,
      'tech': tech,
      'nav' : this.populateNavItems(html, options.get('key'))
    });
  };

  /* Exposes private data models for API usage */
  Paradocs.get = function (key) {
    return data.get(key);
  };

  /* Populate navigation items, from header eg. h1, h2, h3 */
  Paradocs.populateNavItems = function(html, key) {
    return _.map($(key, html), function(el) {
      return '<li><a href="'+$('a', el).prop('href')+'">'+$(el).text()+'</a></li>';
    }).join('');
  };

  Paradocs.Router = Backbone.Router.extend({
    routes: {
      "*tech": 'docs'
    },
    docs: function(filepath){
      Paradocs.fetch(filepath);
      var docsView = new Paradocs.View();
    }
  });

  Paradocs.View = Backbone.View.extend({
    initialize: function () {
      this.el = options.get('el')
      data.on('change', this.render, this);
      return this;
    },
    addCaption: function () {
      $("img").each(function() {
        $(this).wrap('<div class="pics"></div>')
        var title = $(this).attr("title");
        if(title) {
          $(this).after('<p class="desc">'+title+'</p>')
          .removeAttr('title');
        }
      });
      $(".pics").width($(this).find('img').width());
    },
    render: function () {
      $(this.el).html(Paradocs.get('text')).addClass(Paradocs.get('tech'));
      $('ul', '.'+Paradocs.get('tech')).html(Paradocs.get('nav'));
      this.addCaption();
    }
  });

  return Paradocs;
}));
