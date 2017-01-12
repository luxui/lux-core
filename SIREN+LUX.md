Siren+lux
=========

[Siren] is a hypermedia specification which has affordances for more than
simple/static data transfer in: `actions`, `entities`, and `links`. These
additional affordances enable the API to provide more - if not all - necessary
application control information in each response. This, additional information,
means that the application and API need to have less "shared knowledge"; and
therefore puts all control of the application in the domain of the API. The UI
is then only responsible for display based on the resource representations.

## Action Fields

A field is a single *logical* data-point; a "logical data-point" could have
more than one piece of data; "location" might have "latitude" and "longitude"
or "parcel" might have "depth", "height", "width", and "weight".

Field components are the central part of customization in a LuxUI application.
Most parts of the LuxUI framework *can* be customized, or replaced, but the
field components are the area that will most often be customized or replaced to
more appropriately suit the application domain.

*The field components are the area of a LuxUI application that will take it
beyond simple CRUD.*

The LuxUI built-in supported types follow the HTML5 input types for
compatibility and familiarity.

The options and types documented here should not be taken as an exhaustive list
of what is possible with Siren+lux, [custom LuxUI plugins][Plugins] will
be developed over time to solve new, and more specific application needs that
will necessarily define their own types.

### Attributes

Attribute       | Notes
--------------- | -----
cacheable       | A boolean indicating that "lookup" or "search" values can be safely cached.
columns         | An array of string identifying the column names, and order of display, for a table.
features        | An array of strings identifying the component features: add, remove, reorder, filter, sort.
href            | The URL that terms will be sent to for "lookup" or "search". <sup>2</sup>
max             | An inclusive max numeric value.
maxlength       |
min             | An inclusive min numeric value.
minlength       |
multiple        | Boolean indicating that the field can have multiple values <sup>1<sup>
options         | An array of strings; for: checkboxes, datalist, radios, or select.
pattern         | Regular expression to validate the value against.
placeholder     |
readonly        | Boolean <sup>1<sup>
required        | Boolean <sup>1<sup>
size            | String (small, medium, or large) indicating how wide the input should be.
step            |
value           |

  1. *Default is false.*
  2. *POST requests will be used for security; query parameters can be cached.*

### Types

Here are the LuxUI built-in field types, these can be used as the `type` for
`fields` elements of `actions`.

`input` Type    | Notes
--------------- | -----
checkbox        | Will also require that an `options` list be provided.
color           |
date            |
datetime        |
datetime-local  |
email           |
file            | {TODO}
hidden          |
month           |
number          |
password        |
radio           | Will also require that an `options` list be provided.
range           |
select          | Will also require that an `options` list be provided.
search          |
tel             |
text            |
textarea        | Will render a `textarea` rather than an `input`.
time            |
url             |
week            |

The following W3C `input` types are not currently planned to be supported:

`input` Type    | Notes
--------------- | -----
button          | Created from the actions available.
image           | No plans to support this input type.
reset           | This will be left to custom field component plugins.
submit          | Created from the actions available.

#### Meta Types

There are two meta-types: list, and table; both are a collection of zero or
more items. A list is a collection of scalar values (the types above), and a
table is a collection of more complex (non-scalar) types.

A list of *first* names would be defined as `["text"]` while a list of *first
and last* names would be defined as `[["text", "text"]]`. More information is
needed for table than last and some additional optional information can be
provided for both in [meta types config](#meta-types-config).

## Action Classes

Each `action` must answer - at least - two questions with the `class` property:
the scope, and the intent of the `action`. The **scope** will answer for the
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
are specifically searched for by LuxUI for placement.

## Embedded Entities

Some resources have "linked" or "sub" resources that are complex objects
(non-scalar values) and are included in Siren representations to reduce network
requests because they include information that will be necessary for display or
completeness of description.

## Link Relations

Any object within the resource representation that includes an `href` property
should also include a `rel` property and should include at least one of the
following link relations as indication of its purpose and use:

rel                | Intent | URL/Notes
---                | ------ | ---------
`chapter`          | A grouping within a collection; a "page". | `/applications?page=3`
`collection`       | Identifies a collection of resources. | `/applications`
`create-form`      | _Returns a resource which defines an empty form._ | `/applications/*`
`enclosure`        | Embedded entities that are themselves: resources, complex objects, and non-scalar. | `/`
`index`            | The root of the API only. | `/`
`item`             | Identifies an item within a collection of resources. | `/applications/1234`
`first` or `start` | Collection paging; always coupled with "chapter" and "collection". | `/applications?page=1`
`last`             | Collection paging; always coupled with "chapter" and "collection". | `/applications?page=4`
`next`             | Collection paging; always coupled with "chapter" and "collection". | `/applications?page=3`
`current`          | Collection paging; always coupled with "chapter" and "collection". | `/applications?page=2`
`prev`             | Collection paging; always coupled with "chapter" and "collection". | `/applications?page=1`
`related`          | Identifies links to supporting resources; e.g. Settings. | `/applications/1234/settings`
`self`             | The current page/resource | *Any link could have the "self" `rel`.*
`section`          | Top-level resources | Identifies links that will make up the main menu of the application.
`subsection`       | Reserved for the possibility for sub navigation in the main menu. |
`up`               | Identifies a parent resources. | If the UI encounters a link with this `rel` the UI might decide to redirect the user to that resources.

## Title Attributes

The `title` attribute as a property of various portions of a Siren
representation will be use for display in many cases.

Siren "section" | Use of `title`
--------------- | -------------
`actions`       | button text
`links`         | link text
resource        | page title
