# Paradocs

Paradocs (it's a paradox, get it?!?) is a Javascript documentation engine based entirely in the Github API. It's basically a Backbone.js wrapper, that let's you easily fetch compiled HTML from Github API.

It's written entirelly in JavaScript and be as decoupled as possible from any backend code, so it can be used for any projects with as little maintenance as possible and with a few lines of code, in any platform without having to do operations, deploys etc.

It uses Github repositories and blobs as a storage and Github API to retrieve the Markdown files. Github API return generated HTML. The API call changes according to the route you're currently visiting. Eg. if you're reading ```docs/android```, the Paradocs will fetch the ```android.md``` from the Github repository.

----
# Usage

Open the ```app/index.html``` file in your favorite browser to see a demo of what is already implemented.

Currently data are fetched from [tsironis/dockie](https://github.com/bugsense/docs). Just a mere example.
----

## Installation

```bower install paradocs```

```html
<script src="path/to/bower/paradocs.js"></script>
```

**Starting the engine :train:**
```js
$(document).ready(function() {
  Paradocs.start({repo: 'bugsense/docs'});
});
```

**Options**

*   ```el```
    DOM element the docs will be rendered to
*   ```repo```
    Github repo (eg. joyent/node) from where the docs will be fetched
*   ```root```
    Root URL from where the router will be started, for more info [here](http://backbonejs.org/#History-start)

*Example*

```js
Paradocs.start({
  repo: 'bugsense/docs',
  root: 'docs',
  el: 'div#docs'
});
```

----

## Customizing to your needs

*   ```Paradocs.fail { function }```
    This callback will be executed when the AJAX calls fails for some reason

    **Example**

    ```js
    Paradocs.fail = function () {
      $('body').html(Paradocs.errorTmpl);
    };
    ```

*   ```Paradocs.Router { function }```
    Overriding the default Backbone Router

    **Example**

    ```js
    Paradocs.View = Backbone.View.extend({
      initialize: function () {
        this.el = options.get('el')
        data.on('change', this.render, this);
        return this;
      },
      customFunctionThatDoesSth: function() {
        /* do your awesome stuff here */
      },
      render: function () {
        $(this.el).html(Paradocs.get('text')).addClass(Paradocs.get('tech'));
        $('ul', '.'+Paradocs.get('tech')).html(Paradocs.get('nav'));
        this.customFunctionThatDoesSth();
      }
    });
    ```

*   ```Paradocs.Router { function }```
    Overriding the default Backbone Router

    **Example**

    ```js
    Paradocs.Router = Backbone.Router.extend({
      routes: {
        "": "index",
        "*tech": 'docs'
      },
      index: function() {
        $('#loading').hide();
        $('.docs').show();
      },
      docs: function(filepath){
        Paradocs.fetch(filepath);
        var docsView = new Paradocs.View();
      }
    });
    ```

----

## Features

* It's fast
* It's easy
* It has almost zero maintenance
* It nativelly supports versioning, (it's git-based after all)

## Credits

* Dimitris Tsironis (@tsironis) for concept, design & implementation
* Jon Romero (@jonromero) for facilitating development
* Panagiotis PJ Papadomitsos (@priestjim) for finding the awesome name
