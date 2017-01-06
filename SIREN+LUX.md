Siren+lux
=========

[Siren] is a hypermedia specification which has affordances for more than
simple/static data transfer in: `actions`, `entities`, and `links`. These
additional affordances enable the API to provide more - if not all - necessary
application control information in each response. This additional information
means that the application and API need to have less "[shared knowledge]"; and
therefore puts all control of the application in the domain of the API. The UI
is then only responsible for display based on the API responses.

## Action Classes

Each `action` must answer - at least - two questions with the `class` property:
the scope, and the intent of the action. The **scope** will answer for the
*what* of its effect and the **intent** will answer for the *how* of the effect.

  - **Scope** ("What")
    + global - site-wide actions that do not pertain to any specific or typical
        API resource; such as: login, logout, search, or others
    + resource - a collection or an item
    + field - a particular field of a resource
  - **Intent** ("How")
    + `(c___)` create
    + `(___d)` delete
    + `(__u_)` submit
    + `(_r__)` view

*Each `action` should identify one, and only one, of each: scope, and intent.*

Not all combinations of scope and intent are necessarily relevant to all APIs;
some APIs might allow for creation of top-level resource but other not. User
permissions might change one combination to another; for example, an
unauthenticated user might receive `["resource", "view"]` while an
authenticated user will receive `["resource", "submit"]` for the same resource.

## Action Names

Some actions are "special" and need to be used in specific locations within the
UI. These are the "special" action names and their purposes:

  - `login`
    + Defines a form for enabling a user to authenticate
    + Indicates that the current user is not already authenticated
  - `logout`
    + Defines an action to perform to notify the server that the user is
        intending to log out
    + Indicates that the current user is currently authenticated
  - `search` - for performing search

These action names need to be unique within a resource representation as they
are specifically searched for by Luxui for placement.

## Embedded Entities

Some resources have "linked" or "sub" resources that are complex objects
(non-scalar values) and are included in Siren representations to reduce network
requests because they include information that will be necessary for display or
completeness of description.

## Link Relations

Any object within the resource representation that includes an `href` property
should also include a `rel` property - which must be an array of strings - and
should include at least one of the following link relations as indication of
its purpose and use:

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

Only two - top-level - classes are recognized and expected: `collection` and
`item`; all other classes are purely informational and unused by Luxui. The
purpose of these classes is to remove the reliance on URL patterns and data
inference for display determination. This allows the API to explicitly specify
that a resource is one or the other; a `collection` of items or a specific
`item`.

All resources in the API are expected to return a top-level property `class`
which will hold one of: `collection` or `item`. The only exception being the
root resource which may omit the property.

## `title` Attributes

The `title` attribute as a property of various portions of a Siren response
will be use for display in many cases.

Siren "section" | Use of `title`
--------------- | -------------
links           | The title will be used as the link text.
actions         | The title will be used as the button text.

[shared knowledge]: README.md#shared-knowledge
