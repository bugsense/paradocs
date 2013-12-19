function getHTML(file) {
  $.ajaxSetup({
    headers: {
      Accept : "application/vnd.github.VERSION.html+json"
    }
  });
  $.ajax({
    url: "https://api.github.com/repos/tsironis/dockie/contents/"+file+".md",
    type: "GET",
  }).done(function( msg ) {
    $( "#docs" ).html(msg);
  });;
}
var AppRouter = Backbone.Router.extend({
  routes: {
    "docs/:tech": 'docs'
  },
  docs: function(file){
    getHTML(file);
  }
});
var router = new AppRouter();

Backbone.history.start();
