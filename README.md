![Paradocs logo](http://i.imgur.com/vbV0UHY.png?1)

**Paradocs** (prounounced /ˈpærədɒks/ it means next to the docs and also it's a *paradox*, get it?!?) is a Javascript documentation engine based entirely in the Github API. It's basically a [Backbone.js](http://backbonejs.org/) wrapper, that let's you easily fetch compiled Markdown from Github API.

## Installation

Installing paradocs via bower in your project
```bash
bower install paradocs
```
or just download it and put it your project

Then add it to your HTML source:
```html
<script src="path/to/paradocs.js"></script>
```

### Starting the engine
```js
$(document).ready(function() {
  Paradocs.start({repo: 'bugsense/docs'});
});
```

### Initialization Options

* ```el``` - DOM element that the docs will be rendered to

* ```repo``` - Github repo (eg. joyent/node) from where the docs will be fetched

* ```root``` - Root URL from where the router will be started, for more info [here](http://backbonejs.org/#History-start)

***Example***

```js
Paradocs.start({
  repo: 'bugsense/docs',
  root: 'docs',
  el: 'div#docs'
});
```

## Customizing to your needs

*   ```Paradocs.fail [ function ]```

    This callback will be executed when the AJAX calls fails for some reason

    ***Example***

    ```js
    Paradocs.fail = function () {
      $('body').html(Paradocs.errorTmpl);
    };
    ```

*   ```Paradocs.Router [ function ]```

    Overriding the default Backbone Router

    ***Example***

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

*   ```Paradocs.View [ function ]```

    Overriding the default Backbone View

    ***Example***

    ```js
    Paradocs.View = Backbone.View.extend({
      initialize: function () {
        this.el = options.get('el')
        data.on('change', this.render, this);
        // Custom stuff you want to do
        return this;
      },
      customWeirdFunction: function() {
        // more custom stuff
      },
      render: function () {
        $(this.el).html(Paradocs.get('text')).addClass(Paradocs.get('tech'));
        $('ul', '.'+Paradocs.get('tech')).html(Paradocs.get('nav'));
        this.customWeirdStuff();
      }
    });
    ```

## How it works
*Paradocs* is written entirelly in JavaScript and be modular and as decoupled as possible from any backend code, so it can be used for any projects with little maintenance, without writing too many lines of code. Also you can use it in any backend framework without having to do operations, deploys etc.

It uses Github repositories and blobs as a storage and Github API to retrieve the Markdown files. Github API return generated HTML. The API call changes according to the route you're currently visiting. Eg. if you're reading ```/docs/v1/android```, the Paradocs will fetch the ```android.md``` from the Github repository.

## Features

* It's fast
* It's easy/effortless
* It has (almost) zero maintenance
* It nativelly supports versioning, (it's git-based after all), so you can plan your product releases, then merge and be ready to rock and roll.

## Credits

* Dimitris Tsironis [(@tsironis)](http://github.com/tsironis) for concept, design & implementation
* Jon Romero [(@jonromero)](http://github.com/jonromero) for facilitating development process
* Panagiotis PJ Papadomitsos [(@priestjim)](http://github.com/priestjim) for coming up with this awesome name
