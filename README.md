# luxUI

luxUI (or more simply lux) is a [ReactJS] UI framework for hypermedia-based single-page web applications. This framework relies completely on the API responses for building the user experience and application flow. API responses are expected to adhere to [Siren+lux](#sirenlux) a subset of the [Siren] hypermedia specification.

Lux provides for [customization](#lux-customization) per application in:

  - [Non-resource-backed pages](#nonresourcebacked-pages),
  - [Template injection](template-injection), and
  - [Field display components](#field-display-components).

Lux expects RESTful resources to follow a common pattern of [collections](#collections) and [items](#items).

## Lux Customization

lux provides limited customization options; but those customizations are in critical areas which will allow for necessary flexibility.

### Non-resource-backed pages

Pages in an application which are purely content and aren't a resources in the API are considered to be "non-resource-backed". These pages have content that is solely provided by the application and not the API. Some examples would be:

  - a login page; not all applications will have authentication
  - informational page(s), such as an "about us" page

These pages will retrieve the root resource of the API for cross-cutting concerns: main menu links, logged in status, etc.

### Template Injection

TBD

### Field Display Components

TBD


## Siren+lux

[Siren] is a hypermedia specification which has affordances for more than simple/static data transfer in: actions, entities, and links. These additional affordances enable the API to provide more - if not all - necessary application control information in each response. This additional information means that the application and API need to have less "[shared knowledge](#shared-knowledge)"; and therefore puts all control of the application in the domain of the API. The UI is then only responsible for display based on the API responses.

### Action Classes

All actions in a Siren response have an Array property `class` which will indicate to lux what the action type is; the valid action classes are:

  - delete - used to request a resource be removed from the API
  - submit - generically intended for submitting a form; "submit" could be:
    * PUT requests against an existing resource
    * POST requests such as a login form credentials
    * PATCH requests
  - view - includes the fields array to define how a item should be displayed

### Action Names

Some actions are special and need to be used in specific locations within the UI. These are the "special" action names and their purposes:

  - `create-*` - defines an empty resource to fill out
  - `delete` - for requesting a resource to be deleted
  - `login` or `logout` - for a link to a form to allow a user to log in or out
  - `search` - for performing a search action
  - `update` - for updating a resource using a form

### Embedded Entities

Some resources have "linked" or "sub" resources that are complex objects, or non-scalar, values. These additional resources are included in responses to for completeness. lux expects that these be [logically grouped](#complex-top-level-properties), for explicit linking, in the `embedded` section of the response.

### Link Relations

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

#### Examples

##### API root
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

##### Main menu links
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

##### Collection paging
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

##### Complex top-level properties
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

### Resource Classes

Only two classes are recognized and expected: `collection` and `item`; all other classes are purely informational and unused by lux. The purpose of these classes is to remove the reliance on URL patterns and data inference for display determination. This allows the API to explicitly specify that a resource is one or the other; a `collection` of items or a specific `item`.

All resources in the API are expected to return a top-level property `class` which will hold one of: `collection` or `item`. The only exception being the root resource which may omit the property.

### `title` Attributes

The `title` attribute as a property of various portions of a Siren response will be use for display in many cases.

Siren "section" | Use of `title`
--------------- | -------------
links           | The title will be used as the link text.
actions         | The title will be used as the button text.


## Shared Knowledge

Shared knowledge is a crippling hinderance to the evolution, or iteration, of API (back-end) and/or UI (front-end). With shared knowledge between API and UI any update or added feature requires that both be retested and redeployed. This coupling introduces risk, unless automated testing is exhaustive and maintained indefinitely. Testing must also be thorough in exercising edge-cases; which are inherently and increasingly difficult to find as an application grows in features.

One example of "shared knowledge" is, an API provides a unique identifier for a resource and the application "knows" how to construct the URL to that resource based on the unique identifier. This scenario effectively locks the URLs in-place and doesn't allow for the endpoints in an API to change over time; which then prevents the API from evolving over time to fit the changing needs of the domain.

An API should abstract domain knowledge to encourage external integration so that many systems can leverage the abstractions in new and novel ways to solve for business needs. Building an API for only one specific UI limits the ability for an API to be useful to many *different* clients.

lux attempts to have **no "shared knowledge"** between API and UI. All knowledge should be encoded into the API responses in some way.

## RESTful resources

All resources supplied by the API will fall into one of two categories: collection or item. The one resource that doesn't comply with this is the root resource which is neither a collection nor an item.

### Collections

A collection is simply a list of like things; e.g. all items in the `/applications` collection are themselves individual applications. An analogy to a DB would be a table.

### Items

An item is a single thing that is a domain concept; e.g. an application could be found at `/applications/1234`. Using the DB analogy, an item would be analogous to a record in a table; including its related data.


[ReactJS]: https://facebook.github.io/react/
[Siren]: https://github.com/kevinswiber/siren
