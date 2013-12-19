# Paradocs

  This is in POC stage

Docs entries are a pain in the arse. An easy-to-maintain docs engine with versioning and speed in mind.

----
# Usage

Open the ```app/index.html``` file in your favorite browser to see a demo of what is already implemented.

Currently data are fetched from [tsironis/dockie](https://github.com/tsironis/dockie). Just a mere example.
----
# Technical Details

This is supposed to be implemented only in JavaScript and be as decoupled as possible from any backend code, so it can be used for any projects, in any platforms without having to do devops stuff, deploys etc.

It uses Github repositories and blobs as a storage and Github API to retrieve the Markdown files. Github API return generated HTML. The API call changes according to the route you're currently visiting. Eg. if you're reading ```docs/android```, the Paradocs will fetch the ```android.md``` from the Github repository.

----

# Concerns

There are some concerns about how viable this design is. Mainly

* We're depending on Github's uptime in order to display our docs.
* I suspect that the Github API has a limit in the requests we can make to their API. Then again, the requests will be made from users' browsers so it's not IP or API tokens specific requests. Investigating further.
* Is it easy for our developers to use docs in this way?
