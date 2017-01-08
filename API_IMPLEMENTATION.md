API Implementation Guide
========================

This is an attempt at a practical step-by-step "how to" guide for creating an
API that implements the features expected by Luxui. This guide will focus on
what the API responses should look like and not how to produce the responses as
that is well beyond the scope of Luxui.

## Table of Contents
<!--
  Use this list as indication of what topics to cover; items should only be
  linked to their sections as indication when "complete".
-->
  1. [Root resource](#root-resource)
  2. [Menu links](#menu-links)
    + [ ] {TODO} Nested menu links ("sub-section")
  3. [Resource Types](#resource-types)
    + [Collections (including pagination)](#collection)
    + [Items](#item)
  4. [Form actions](#form-actions)
    + [`(c___)` create](#create)
    + `(___d)` delete
    + `(__u_)` submit (PATCH, POST, or PUT)
    + [`(_r__)` view](#view)
  5. Field components
    + Options and configuration
    + Default components
    + Custom components - via plug-ins
    + Component validation
    + Interactive components
      * Search and lookup (cacheable, no-API-call)
      * List and Table
        - Augmenting options (add, remove, reorder)
        - Display-only options (sort, filter)
  6. [ ] {TODO} Breadcrumbs
  7. [ ] {TODO} Workflow
    + [ ] {TODO} Return to parent

*NOTE: All of the examples below are going to assume that the appropriate media
type `application/vnd.siren+json` is being requested in the header value but is
omitted for brevity. This Luxui `apiRequest` module handles this by default.*

## Root Resource

Any RESTful API should have at least one resource `/`. This is the entry-point
to all of the other endpoints. This resource will always be available and
return information about what additional actions can be performed or links that
can be followed.

Luxui will be expecting a few things. The first is that the appropriate media
type - `application/vnd.siren+json` - is being used. The only other thing that
is required is that it includes a `links` property.

**GET** `http://foo.bar`

```
{
  "links": [
    {
      "href": "http://foo.bar",
      "rel": ["index", "self"],
      "title": "Foo Bar"
    }
  ]
}
```

Since `href` and `title` are pretty much self-explanatory we'll skip those and
explain more about the values in the `rel` array.

The "index" value indicates that the link is the "root resource" of the API.
Spoiler alert, this link will be included in ALL representations returned from
the API and it will always include that value "index"; because it will always
be the "root resource".

Now the "self" value simply means that the link is the same as the outer
resource. This value will migrate around once we have additional resources in
the API - and are viewing those - and will always indicate the current resource
representation. We'll see more of this value as we go through this guide.

This is all that is necessary from the root resource for Luxui to be able to
render a page. Albeit that with this as the API response not much else is going
to be available.

Next let's add some other links so that a user can navigate around a little.

## Menu Links

Many sites will provide a list of links as a "main menu", so let's do that next
so that the application will allow a user to navigate around. To do this we
only need to provide some additional links with some specific link relations.

**GET** `http://foo.bar`

```
{
  "links": [
    {
      "href": "http://foo.bar",
      "rel": ["index", "self"],
      "title": "Foo Bar"
    },
    {
      "href": "http://foo.bar/about",
      "rel": ["section"],
      "title": "About"
    }
  ]
}
```

After making changes to the API and making the request to the API once again we
see that we are given another link. Now if we "follow" that link we will get a
new representation.

**GET** `http://foo.bar/about`

```
{
  "links": [
    {
      "href": "http://foo.bar",
      "rel": ["index"],
      "title": "Foo Bar"
    },
    {
      "href": "http://foo.bar/about",
      "rel": ["section", "self"],
      "title": "About"
    }
  ]
}
```

Not much exciting is going to be available yet but some things to notice are:
the "index" link is still there, but the "self" `rel` has moved to the newer
link. The "self" `rel` simply indicates which resource the representation is
describing; easy. The "section" `rel` just means that the link should be
included in a "main menu".

Now that we have a resource beyond the root resource we will need to start
declaring which type - collection, or item - a resource is; we'll cover that in
[Resource Types](#resource-types).

## Resource Types

In a Luxui application there are only three total resource types; and one of
those - the root resource - will only ever have one instance. The other two
types of resources are either a item or a collection of items.

If we were to use an analogy of a parking lot, a specific parking spot in the
parking lot would be an item and all of the spots in the parking lot would be
considered the collection. Analogous to resources in an API each spot has
representation, and the representation has myriad properties that describe in
more and more detail the representation.

### Collection

We'll explore collections first as they are logically and alphabetically first;
logically first because many APIs manage which collections they are going to
provide and thus they will just exist for you to view.

**GET** `http://parking.foo/parking-spaces`

```
{
  "entities": [
    { href: "http://parking.foo/parking-spaces/1", title: "Parking Space 1" },
    { href: "http://parking.foo/parking-spaces/2", title: "Parking Space 2" },
    { href: "http://parking.foo/parking-spaces/3", title: "Parking Space 3" },
    { href: "http://parking.foo/parking-spaces/4", title: "Parking Space 4" }
  ],
  "links": [
    {
      "href": "http://parking.foo",
      "rel": ["index"],
      "title": "The Parking Lot API"
    },
    {
      "href": "http://parking.foo/parking-spaces?page=2",
      "rel": ["chapter", "collection, "next"],
      "title": "Parking Spaces (page 2)"
    },
    {
      "href": "http://parking.foo/parking-spaces?page=13",
      "rel": ["chapter", "collection, "last"],
      "title": "Parking Spaces (page 13)"
    },
    {
      "href": "http://parking.foo/parking-spaces",
      "rel": ["chapter", "collection", "current", "first", "section", "self"],
      "title": "Parking Spaces"
    }
  ],
  "properties": {
    "capacity": 50,
    "pageSize": 4,
    "vacant": 8
  }
}
```

A lot more is going on now. First, we can see that the `rel` "collection" has
been added to the link with the "self" `rel`, and this will tell Luxui which
type of resource has been returned and that will inform how to render the
resource in the UI. Since this is a collection that will bring with it a whole
bunch more detail: `properties` detail meta information about the resource,
more links that enable navigating through the "pages" ("chapter" `rel`s) of the
collection, and `entities` for the items in the collection. Some other `rel`s
should pretty self-evident: "current", "first", "last", and "next"; another
that isn't included in the example is "prev" for previous.

### Item

If we were to follow one of the links for a parking spot we would get something
like the following:

**GET** `http://parking.foo/parking-spaces/1`

```
{
  "actions": [
    {
      "class": ["resource", "view"],
      "fields": [
        {
          "name": "name",
          "type": "text",
          "value": "Parking Space Number 1 Dashboard"
        },
        {
          "name": "covered",
          "options": [
            "Yes",
            "No"
          ],
          "type": "radio",
          "value": true
        },
        {
          "name": "vacant",
          "options": [
            "Yes",
            "No"
          ],
          "type": "radio",
          "value": false
        }
      ],
      "name": "view-item",
      "title": "Parking Space Number 1 Dashboard"
    }
  ],
  "links": [
    {
      "href": "http://parking.foo",
      "rel": ["index"],
      "title": "The Parking Lot API"
    },
    {
      "href": "http://parking.foo/parking-spaces",
      "rel": ["chapter", "collection", "current", "first", "section"],
      "title": "Parking Spaces"
    },
    {
      "href": "http://parking.foo/parking-spaces/1",
      "rel": ["item", "self"],
      "title": "Parking Space Number 1"
    }
  ],
  "properties": {
    "covered": true,
    "name": "Parking Space Number 1 Dashboard",
    "vacant": false
  }
}
```

More new stuff here. First let's note the new `rel`, being used with the "self"
link, "item" that identifies what resource type this representation is. The
`properties` object should be pretty familiar and resemble what a plain JSON
API would return for a resource like this. The big thing here is the `actions`
property of the representation; this describes the fields to display, their
order to display in the page, what type of field they should be, and the
current value. The `title` will be used as a title for the form/page. The
`name` property of the action is fairly inconsequential and ignored by Luxui.
Finally, the [action's `class`](SIREN+LUX.md#action-classes) is documented in
[Siren+lux](SIREN+LUX.md).

## Form Actions

Where Luxui applications start to get truly exciting is in the actions that can
be performed against resources in the API; and specifically in the area of
[field components](#field-components) but that is getting ahead of ourselves.

The first, and most crucial of form "actions" is the "view" action; for without
the view there would be no display.

### View

The "view" action is required and the most detailed piece of the puzzle. It is
the form layout; a listing of all of the fields and their configurations.

**GET** `http://foo.bar/users/CuteCuddlyBear`

```
{
  // ...
  "actions": [
    {
      "class": ["resource", "view"],
      "fields": [
        {
          "name": "username",
          "type": "text",
          "value": "CuteCuddlyBear"
        },
        {
          "name": "fullname",
          "type": "text",
          "value": "Bear, Cute Cuddly"
        },
        {
          "name": "dob",
          "type": "date",
          "value": "01-01-2016"
        }
      ],
      "name": "view",
      "title": "the 'title' of the view action is ignored and can be omitted"
    }
  ],
  // ...
}
```

To start off with, keeping in mind ["scope and intent"][action-classes], this
action has the scope of a "resource" and its intent is only to "view"; not to
make changes of any kind. There are three fields: a `text` field for "username"
and "fullname", and a `date` field for "dob" (date of birth). All of the
fields, if they are rendered solely based on this action, will be "readonly"
because this is only a `view` and none of the mutation actions. Another
important point to cover is that this could be the response for an
unauthenticated request or an authenticate request with no permissions to alter
the state of the resource; Luxui doesn't actually care which is the case as it
only knows what representation it received.

There are more options/configuration that can be added to various fields and
types. Check the complete listing of [options and configuration](#options-and-configuration)
for all built-in components.

### Create

The action for to "create" a new resource will be very similar to that of the
"view" with a few distinct differences:

**GET** `http://foo.bar/users`

```
{
  // ...
  "actions": [
    {
      "class": ["resource", "create"],
      "fields": [
        // ...
      ],
      "href": "http://foo.bar/users",
      "method": "POST",
      "name": "create-user",
      "rel": ["create-form"],
      "title": "Add User",
      "type": "application/json"
    }
  ],
  // ...
}
```

Here we can see a few additional properties which provide necessary information
about: HTTP `method`, request body content `type`, the `title` becomes the
button text, and "create" indicate the intent in `class`; the "create-form"
`rel` is primarily informational but could be helpful. One other thing to take
note of is the location of this resource - the parent of where the eventually
resource.

[action-classes]: SIREN+lux.md#action-classes
