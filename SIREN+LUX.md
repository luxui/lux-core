Siren+lux
=========

[Siren] is a hypermedia specification which has affordances for more than simple/static data transfer in: actions, entities, and links. These additional affordances enable the API to provide more - if not all - necessary application control information in each response. This additional information means that the application and API need to have less "[shared knowledge](#shared-knowledge)"; and therefore puts all control of the application in the domain of the API. The UI is then only responsible for display based on the API responses.

## Action Classes

All actions in a Siren response have an Array property `class` which will indicate to lux what the action type is; the valid action classes are:

  - delete - used to request a resource be removed from the API
  - submit - generically intended for submitting a form; "submit" could be:
    * PUT requests against an existing resource
    * POST requests such as a login form credentials
    * PATCH requests
  - view - includes the fields array to define how a item should be displayed

## Action Names

Some actions are special and need to be used in specific locations within the UI. These are the "special" action names and their purposes:

  - `create-*` - defines an empty resource to fill out
  - `delete` - for requesting a resource to be deleted
  - `login` or `logout` - for a link to a form to allow a user to log in or out
  - `search` - for performing a search action
  - `update` - for updating a resource using a form

## Embedded Entities

Some resources have "linked" or "sub" resources that are complex objects, or non-scalar, values. These additional resources are included in responses to for completeness. lux expects that these be [logically grouped](#complex-top-level-properties), for explicit linking, in the `embedded` section of the response.

## Link Relations

Any property within the resource representation that includes an `href` property must also include a `rel` property and should include at least one of the following link rels.

rel                | Intent | URL/Notes
---                | ------ | ---------
`chapter`          | A grouping within a collection; a "page". | `/applications?page=3`
`collection`       | Identifies a collection of resources. | `/applications`
`create-form`      | _Returns a resource which defines an empty form._ | `/applications/*`
`enclosure`        | Embedded entities that are themselves: resources, complex objects, and non-scalar. | `/`
`index`            | The root of the API only. | `/`
`item`             | Identifies an item within a collection of resources. | `/applications/1234`
`first` or `start` | Collection paging; always coupled with `chapter` and `collection`. | `/applications?page=1`
`last`             | Collection paging; always coupled with `chapter` and `collection`. | `/applications?page=4`
`next`             | Collection paging; always coupled with `chapter` and `collection`. | `/applications?page=3`
`current`          | Collection paging; always coupled with `chapter` and `collection`. | `/applications?page=2`
`prev`             | Collection paging; always coupled with `chapter` and `collection`. | `/applications?page=1`
`related`          | Identifies links to supporting resources; e.g. Settings. | `/applications/1234/settings`
`self`             | The current page/resource | *Any link could have the `self` rel.*
`section`          | Top-level resources | Identifies links that will make up the main menu of the application.
`subsection`       | Reserved for the possibility for sub navigation in the main menu. |
`up`               | Identifies a parent resources. | If the UI encounters a link with this rel the UI might decide to redirect the user to that resources for good UX.

### Examples

#### API root
```
// ...
  "links": [
    {
      "href": ".../",
      "rel": ["index"],
      "title": "Home"
    }
  ]
// ...
```

#### Main menu links
```
// ...
  "links": [
    {
      "href": ".../applications",
      "rel": ["collection", "section"],
      "title": "Applications"
    }
  ],
// ...
```

#### Collection paging
```
// ...
  "links": [
    {
      "href": ".../applications?page=2",
      "rel": ["chapter", "collection", "current", "self"],
      "title": "Current"
    },
    {
      "href": ".../applications?page=1",
      "rel": ["chapter", "collection", "first"],
      "title": "First"
    },
    {
      "href": ".../applications?page=4",
      "rel": ["chapter", "collection", "last"],
      "title": "Last"
    },
    {
      "href": ".../applications?page=3",
      "rel": ["chapter", "collection", "next"],
      "title": "Next"
    },
    {
      "href": ".../applications?page=1",
      "rel": ["chapter", "collection", "prev"],
      "title": "Previous"
    }
  ],
// ...
```

#### Complex top-level properties
```
// ...
  "entities": [
    {
      "entities": [
        {
          "class": ["application"],
          "href": ".../applications/6789",
          "rel": ["related"],
          "title": "Application 6789"
        },
        // ... many more.
      ],
      "href": ".../applications/1234/rules",
      "rel": ["collection", "enclosure", "related"],
      "title": "targetRules"
    },
  ],
// ...
```

## Resource Classes

Only two classes are recognized and expected: `collection` and `item`; all other classes are purely informational and unused by lux. The purpose of these classes is to remove the reliance on URL patterns and data inference for display determination. This allows the API to explicitly specify that a resource is one or the other; a `collection` of items or a specific `item`.

All resources in the API are expected to return a top-level property `class` which will hold one of: `collection` or `item`. The only exception being the root resource which may omit the property.

## `title` Attributes

The `title` attribute as a property of various portions of a Siren response will be use for display in many cases.

Siren "section" | Use of `title`
--------------- | -------------
links           | The title will be used as the link text.
actions         | The title will be used as the button text.
