# Custom

#### Purpose
This is the place to put custom built forks of third-party packages. The reasoning for "forking" a package should be explained below for each package built.

## Packages

### draft-js-arguments-plugin
* Original Package: [draft-js-metions-plugin](https://github.com/draft-js-plugins/draft-js-plugins/tree/master/draft-js-mention-plugin)

* Original Purpose:

  * Allow "mentions" to be injected into a draft js editor using a trigger character '@' and a drop down that lists existing users to convert to mentions.

* Reasons for forking:

  * Changing the nomenclature from "mention" to "argument" to match the argument model of the exec application
  * Allowing for fixed dropdown option to "create a new argument" in addition to injection existing arguments
  * Removing all of the dynamic aspects of the original package and replacing it with a condensed and fixed version that does only what this project requires it to do. (e.g. Remove dynamic trigger character, remove dynamic styling, etc.)
  * Using a fixed trigger character '$' to mimick "bash" behavior
  * Converting the entire plugin to typescript